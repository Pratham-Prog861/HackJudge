"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Bell, Shield, Palette, Globe, Mail, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const me = useQuery(api.users.getCurrentUser, {});

  return (
    <div className="mx-auto max-w-4xl space-y-10 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account preferences, notifications, and security.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <aside className="space-y-1">
          {[
            { label: "Profile", icon: User },
            { label: "Notifications", icon: Bell },
            { label: "Security", icon: Shield },
            { label: "Appearance", icon: Palette },
          ].map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-[#151926] hover:text-foreground"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </aside>

        <div className="md:col-span-2 space-y-8">
          {/* Profile Section */}
          <section className="rounded-2xl bg-[#151926] p-6 border border-border/10">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6 text-foreground">
              <User className="h-5 w-5 text-primary" />
              Public Profile
            </h2>

            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label
                  htmlFor="name"
                  className="text-xs text-muted-foreground uppercase tracking-wider"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  defaultValue={me?.name || ""}
                  className="bg-[#0f131e] border-border/10 focus:ring-primary/50"
                  placeholder="Architect Name"
                />
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="text-xs text-muted-foreground uppercase tracking-wider"
                >
                  Email Address
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    value={me?.email || ""}
                    disabled
                    className="bg-[#0f131e] border-border/10 opacity-60 text-muted-foreground flex-1"
                  />
                  <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 flex items-center gap-2">
                    <Shield className="h-3 w-3 text-emerald-400" />
                    <span className="text-[10px] font-semibold text-emerald-400 uppercase">
                      Verified
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label
                  htmlFor="bio"
                  className="text-xs text-muted-foreground uppercase tracking-wider"
                >
                  Bio
                </Label>
                <Input
                  id="bio"
                  className="bg-[#0f131e] border-border/10 focus:ring-primary/50"
                  placeholder="Brief description of your expertise..."
                />
              </div>
            </div>
          </section>

          {/* Social Connections */}
          <section className="rounded-2xl bg-[#151926] p-6 border border-border/10">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6 text-foreground">
              <Globe className="h-5 w-5 text-primary" />
              Social Connections
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#0f131e] border border-border/5">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      GitHub
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Connected as{" "}
                      {me?.name?.toLowerCase().replace(" ", "") || "user"}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-border/20"
                >
                  Disconnect
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-[#0f131e] border border-border/5">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Email Notifications
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Receive weekly score updates
                    </p>
                  </div>
                </div>
                <Switch checked />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-3">
            <Button variant="outline" className="text-xs border-border/20">
              Discard Changes
            </Button>
            <Button className="bg-linear-to-r from-primary to-[#8d98ff] text-xs font-medium px-6">
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
