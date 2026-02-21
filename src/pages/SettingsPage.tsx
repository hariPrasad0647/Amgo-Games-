import { useState } from "react";

const sections = ["General", "Notifications", "Security", "Billing"] as const;
type Section = typeof sections[number];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>("General");
  const [notifications, setNotifications] = useState({ email: true, push: false, weekly: true });

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <nav className="w-44 shrink-0 space-y-0.5">
        {sections.map((s) => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
              activeSection === s
                ? "bg-accent font-medium text-foreground"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            }`}
          >
            {s}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="flex-1 rounded-lg border border-border bg-card p-6">
        {activeSection === "General" && (
          <div className="max-w-md space-y-4">
            <h3 className="text-base font-semibold text-foreground">General Settings</h3>
            {[
              { label: "Organization Name", value: "Acme Inc" },
              { label: "Contact Email", value: "admin@acme.com" },
              { label: "Timezone", value: "UTC-8 (Pacific)" },
            ].map((field) => (
              <div key={field.label}>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {field.label}
                </label>
                <input
                  type="text"
                  defaultValue={field.value}
                  className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-shadow"
                />
              </div>
            ))}
            <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 active:opacity-80 transition-opacity">
              Save
            </button>
          </div>
        )}

        {activeSection === "Notifications" && (
          <div className="max-w-md space-y-4">
            <h3 className="text-base font-semibold text-foreground">Notification Preferences</h3>
            {Object.entries(notifications).map(([key, enabled]) => (
              <label key={key} className="flex items-center justify-between">
                <span className="text-sm capitalize text-foreground">{key.replace(/([A-Z])/g, " $1")} notifications</span>
                <button
                  onClick={() => setNotifications((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                  className={`relative h-6 w-11 rounded-full transition-colors ${enabled ? "bg-primary" : "bg-secondary"}`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform ${
                      enabled ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
        )}

        {activeSection === "Security" && (
          <div className="max-w-md space-y-4">
            <h3 className="text-base font-semibold text-foreground">Security</h3>
            <p className="text-sm text-muted-foreground">Manage passwords, 2FA, and session settings.</p>
            <button className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors">
              Change Password
            </button>
            <button className="ml-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors">
              Enable 2FA
            </button>
          </div>
        )}

        {activeSection === "Billing" && (
          <div className="max-w-md space-y-4">
            <h3 className="text-base font-semibold text-foreground">Billing</h3>
            <div className="rounded-md border border-border p-4">
              <p className="text-sm font-medium text-foreground">Pro Plan</p>
              <p className="text-xs text-muted-foreground">$49/month · Renews Mar 15, 2026</p>
            </div>
            <button className="rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors">
              Manage Subscription
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
