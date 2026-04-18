import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import AdminCharts from "./AdminCharts";

export const dynamic = "force-dynamic";

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

function greeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Working late";
}

function relativeTime(d: Date) {
  const diff = Date.now() - d.getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString();
}

export default async function AdminOverview() {
  const session = await auth();
  const now = new Date();
  const last30 = daysAgo(30);

  const [users, buyers, realtors, admins, properties, published, draft, inquiries, newInquiries, pendingResets, pendingRealtors] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "BUYER" } }),
    prisma.user.count({ where: { role: "REALTOR" } }),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.property.count(),
    prisma.property.count({ where: { status: "PUBLISHED" } }),
    prisma.property.count({ where: { status: "DRAFT" } }),
    prisma.inquiry.count(),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.passwordResetRequest.count({ where: { status: "PENDING" } }),
    prisma.user.count({ where: { role: "REALTOR", realtorApproved: false } }),
  ]);

  const viewsAgg = await prisma.property.aggregate({ _sum: { views: true } });
  const totalViews = viewsAgg._sum.views ?? 0;

  const [userDaily, inquiryDaily, propertyDaily] = await Promise.all([
    prisma.user.findMany({ where: { createdAt: { gte: last30 } }, select: { createdAt: true, role: true } }),
    prisma.inquiry.findMany({ where: { createdAt: { gte: last30 } }, select: { createdAt: true } }),
    prisma.property.findMany({ where: { createdAt: { gte: last30 } }, select: { createdAt: true } }),
  ]);

  const byArea = await prisma.property.groupBy({
    by: ["area"],
    _count: { _all: true },
    orderBy: { _count: { area: "desc" } },
    take: 8,
  });

  const byType = await prisma.property.groupBy({
    by: ["propertyType"],
    _count: { _all: true },
  });

  const dayLabels: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = daysAgo(i);
    dayLabels.push(d.toISOString().slice(0, 10));
  }
  function series(items: { createdAt: Date }[]) {
    const map = new Map<string, number>();
    dayLabels.forEach((d) => map.set(d, 0));
    items.forEach((it) => {
      const k = it.createdAt.toISOString().slice(0, 10);
      if (map.has(k)) map.set(k, (map.get(k) ?? 0) + 1);
    });
    return dayLabels.map((d) => ({ date: d.slice(5), n: map.get(d) ?? 0 }));
  }

  const userSeries = series(userDaily).map((p) => ({ date: p.date, users: p.n }));
  const inquirySeries = series(inquiryDaily).map((p) => ({ date: p.date, inquiries: p.n }));
  const propertySeries = series(propertyDaily).map((p) => ({ date: p.date, properties: p.n }));

  const areaChart = byArea.map((a) => ({ area: a.area, count: a._count._all }));
  const typeChart = byType.map((t) => ({ type: t.propertyType, count: t._count._all }));

  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: { id: true, name: true, email: true, role: true, realtorApproved: true, createdAt: true },
  });
  const recentInquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { property: { select: { title: true, area: true } } },
  });
  const recentProps = await prisma.property.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { realtor: { select: { name: true } } },
  });

  // combined activity feed
  type Event = { t: Date; kind: "user" | "inquiry" | "property"; label: string; sub: string };
  const events: Event[] = [
    ...recentUsers.map((u) => ({ t: u.createdAt, kind: "user" as const, label: `${u.name} joined`, sub: `${u.role.toLowerCase()} · ${u.email}` })),
    ...recentInquiries.map((iq) => ({ t: iq.createdAt, kind: "inquiry" as const, label: `${iq.name} inquired`, sub: iq.property.title })),
    ...recentProps.map((p) => ({ t: p.createdAt, kind: "property" as const, label: p.title, sub: `Listed by ${p.realtor.name} · ${p.area}` })),
  ].sort((a, b) => b.t.getTime() - a.t.getTime()).slice(0, 9);

  const buyerShare = users ? Math.round((buyers / users) * 100) : 0;
  const realtorShare = users ? Math.round((realtors / users) * 100) : 0;
  const publishRate = properties ? Math.round((published / properties) * 100) : 0;
  const openInquiryRate = inquiries ? Math.round((newInquiries / inquiries) * 100) : 0;

  const firstName = session?.user?.name?.split(" ")[0] ?? "Admin";

  return (
    <>
      <div className="welcome-hero">
        <div className="welcome-inner">
          <span className="kicker">{now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</span>
          <h1>{greeting(now.getHours())}, {firstName}.</h1>
          <p>Here&apos;s what&apos;s happening across Skyline today.</p>
        </div>
        <div className="welcome-actions">
          <Link className="btn-sm ghost light" href="/dashboard/admin/users">Manage users</Link>
          <Link className="btn-sm light" href="/dashboard/admin/properties">All properties</Link>
        </div>
      </div>

      {(pendingResets + pendingRealtors + newInquiries) > 0 && (
        <div className="attention-grid">
          {pendingResets > 0 && (
            <Link href="/dashboard/admin/resets" className="attention-card">
              <div className="attention-num">{pendingResets}</div>
              <div>
                <strong>Password reset{pendingResets === 1 ? "" : "s"}</strong>
                <span>Waiting for your approval</span>
              </div>
              <span className="attention-arrow">→</span>
            </Link>
          )}
          {pendingRealtors > 0 && (
            <Link href="/dashboard/admin/users?filter=pending-realtors" className="attention-card">
              <div className="attention-num">{pendingRealtors}</div>
              <div>
                <strong>Realtor{pendingRealtors === 1 ? "" : "s"} pending</strong>
                <span>Review and approve listings access</span>
              </div>
              <span className="attention-arrow">→</span>
            </Link>
          )}
          {newInquiries > 0 && (
            <Link href="/dashboard/admin/inquiries" className="attention-card">
              <div className="attention-num">{newInquiries}</div>
              <div>
                <strong>New inquir{newInquiries === 1 ? "y" : "ies"}</strong>
                <span>Unanswered buyer messages</span>
              </div>
              <span className="attention-arrow">→</span>
            </Link>
          )}
        </div>
      )}

      <div className="stat-grid rich">
        <div className="stat-card">
          <div className="stat-head">
            <span className="stat-icon icon-wood" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="8" r="3.2"/><path d="M4.5 20c.8-3.8 3.9-6 7.5-6s6.7 2.2 7.5 6"/></svg>
            </span>
            <span className="stat-label">Total Users</span>
          </div>
          <div className="stat-value">{users}</div>
          <div className="stat-split">
            <span><em style={{ background: "var(--wood)" }} />{buyers} buyers</span>
            <span><em style={{ background: "var(--olive)" }} />{realtors} realtors</span>
            <span><em style={{ background: "var(--charcoal)" }} />{admins} admin</span>
          </div>
          <div className="stat-bar">
            <div style={{ width: `${buyerShare}%`, background: "var(--wood)" }} />
            <div style={{ width: `${realtorShare}%`, background: "var(--olive)" }} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-head">
            <span className="stat-icon icon-olive" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 10l8-6 8 6v9a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z"/></svg>
            </span>
            <span className="stat-label">Properties</span>
          </div>
          <div className="stat-value">{properties}</div>
          <div className="stat-sub">{published} published · {draft} draft</div>
          <div className="stat-bar"><div style={{ width: `${publishRate}%`, background: "var(--olive)" }} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-head">
            <span className="stat-icon icon-charcoal" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 11.5a7.5 7.5 0 0 1-10.6 6.8L4 21l2.2-5.4A7.5 7.5 0 1 1 21 11.5z"/></svg>
            </span>
            <span className="stat-label">Inquiries</span>
          </div>
          <div className="stat-value">{inquiries}</div>
          <div className="stat-sub">{newInquiries} new · {inquiries - newInquiries} handled</div>
          <div className="stat-bar"><div style={{ width: `${openInquiryRate}%`, background: "var(--charcoal)" }} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-head">
            <span className="stat-icon icon-sand" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
            </span>
            <span className="stat-label">Listing Views</span>
          </div>
          <div className="stat-value">{totalViews}</div>
          <div className="stat-sub">Across {published} live listing{published === 1 ? "" : "s"}</div>
          <div className="stat-bar"><div style={{ width: published ? "100%" : "0%", background: "var(--stone)" }} /></div>
        </div>
      </div>

      <AdminCharts
        userSeries={userSeries}
        inquirySeries={inquirySeries}
        propertySeries={propertySeries}
        areaChart={areaChart}
        typeChart={typeChart}
      />

      <div className="chart-grid-2">
        <div className="panel">
          <div className="panel-head">
            <div>
              <h2 className="panel-title">Recent Activity</h2>
              <p className="panel-sub">Signups, inquiries, and new listings.</p>
            </div>
          </div>
          {events.length === 0 ? (
            <div className="empty-state"><strong>Quiet so far</strong>Activity will show here as users engage.</div>
          ) : (
            <ul className="timeline">
              {events.map((e, i) => (
                <li key={i} className={`tl-event tl-${e.kind}`}>
                  <span className="tl-dot" aria-hidden="true" />
                  <div className="tl-body">
                    <div className="tl-label">{e.label}</div>
                    <div className="tl-sub">{e.sub}</div>
                  </div>
                  <div className="tl-time">{relativeTime(e.t)}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="panel">
          <div className="panel-head">
            <div>
              <h2 className="panel-title">Recent Signups</h2>
              <p className="panel-sub">Newest people on Skyline.</p>
            </div>
            <Link className="btn-sm ghost" href="/dashboard/admin/users">All users</Link>
          </div>
          {recentUsers.length === 0 ? (
            <div className="empty-state"><strong>No users yet</strong></div>
          ) : (
            <ul className="user-list">
              {recentUsers.map((u) => (
                <li key={u.id} className="user-row">
                  <div className="avatar" aria-hidden="true">{u.name.slice(0, 1).toUpperCase()}</div>
                  <div className="user-meta">
                    <strong>{u.name}</strong>
                    <span>{u.email}</span>
                  </div>
                  <div className="user-tags">
                    <span className={`tag tag-${u.role.toLowerCase()}`}>{u.role}</span>
                    {u.role === "REALTOR" && !u.realtorApproved && <span className="tag tag-pending">pending</span>}
                  </div>
                  <div className="user-time">{relativeTime(u.createdAt)}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
