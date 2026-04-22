"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Bell, Shield, Palette, Globe, Save } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/toast-provider";

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

        <div className="md:col-span-2">
          {me ? (
            <SettingsContent me={me} />
          ) : (
            <div className="space-y-8 animate-pulse">
              <div className="h-64 rounded-2xl bg-[#151926] border border-border/10" />
              <div className="h-48 rounded-2xl bg-[#151926] border border-border/10" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface UserData {
  name: string | null;
  email: string | null;
  githubUsername?: string;
  bio?: string;
}

function SettingsContent({ me }: { me: UserData }) {
  const updateGithub = useMutation(api.users.updateGithubConnection);
  const updateProfile = useMutation(api.users.updateProfile);
  const { toast } = useToast();

  const [isConnecting, setIsConnecting] = useState(false);
  const [githubInput, setGithubInput] = useState("");
  const [name, setName] = useState(me.name || "");
  const [bio, setBio] = useState(me.bio || "");

  const handleConnect = async () => {
    if (!githubInput.trim()) return;
    try {
      await updateGithub({ githubUsername: githubInput.trim() });
      toast({
        title: "GitHub Linked",
        description: `Successfully connected to ${githubInput}`,
        variant: "success",
      });
      setIsConnecting(false);
      setGithubInput("");
    } catch {
      toast({
        title: "Connection Failed",
        description: "Failed to link GitHub account.",
        variant: "error",
      });
    }
  };

  const handleDisconnect = async () => {
    try {
      await updateGithub({ githubUsername: null });
      toast({
        title: "GitHub Unlinked",
        description: "Your GitHub connection has been removed.",
        variant: "success",
      });
    } catch {
      toast({
        title: "Action Failed",
        description: "Could not remove GitHub connection.",
        variant: "error",
      });
    }
  };

  const handleSave = async () => {
    try {
      await updateProfile({ name, bio });
      toast({
        title: "Settings Saved",
        description: "Your profile has been updated.",
        variant: "success",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "error",
      });
    }
  };

  return (
    <div className="space-y-8">
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                value={me.email || ""}
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
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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
              <Globe className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">GitHub</p>
                <p className="text-xs text-muted-foreground">
                  {me.githubUsername ? (
                    <>
                      Connected as{" "}
                      <span className="text-secondary font-medium">
                        {me.githubUsername}
                      </span>
                    </>
                  ) : (
                    "Not connected"
                  )}
                </p>
              </div>
            </div>

            {me.githubUsername ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDisconnect}
                className="text-xs border-border/20 text-red-400/80 hover:text-red-400 hover:bg-red-400/5 hover:border-red-400/20"
              >
                Disconnect
              </Button>
            ) : isConnecting ? (
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Username"
                  value={githubInput}
                  onChange={(e) => setGithubInput(e.target.value)}
                  className="h-8 text-xs bg-[#0a0e18] border-border/10 w-32"
                />
                <Button
                  size="sm"
                  onClick={handleConnect}
                  className="h-8 text-xs bg-secondary/10 text-secondary hover:bg-secondary/20"
                >
                  Link
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsConnecting(false)}
                  className="h-8 text-xs"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsConnecting(true)}
                className="text-xs border-border/20"
              >
                Connect
              </Button>
            )}
          </div>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => {
            setName(me.name || "");
            setBio(me.bio || "");
          }}
          className="text-xs border-border/20"
        >
          Discard Changes
        </Button>
        <Button
          onClick={handleSave}
          className="bg-linear-to-r from-primary to-[#8d98ff] text-xs font-medium px-6"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
