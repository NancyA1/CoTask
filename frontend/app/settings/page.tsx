"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "https://serene-heliotrope-3138a4.netlify.app/api/auth/me",
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        console.log("Profile:", data);

        if (response.ok) {
          setUser(data.user);
          setName(data.user.name);
          setEmail(data.user.email);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateProfile = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        "https://serene-heliotrope-3138a4.netlify.app/api/auth/me",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setEditing(false);
        setMessage("Profile updated successfully.");
      } else {
        setMessage(
          data.message || "Failed to update profile."
        );
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard">

      <Sidebar />

      <main className="dashboard-main">

        <div className="projects-header">
          <div>
            <p className="projects-eyebrow">
              ACCOUNT
            </p>

            <h1>Settings</h1>

            <p className="projects-subtitle">
              Manage your account and preferences.
            </p>
          </div>
        </div>

        {loading ? (
          <p>Loading profile...</p>
        ) : user ? (
          <div className="settings-card">

            <div className="settings-avatar">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div className="settings-user-info">

              {!editing ? (
                <>
                  <h2>{user.name}</h2>

                  <p>{user.email}</p>

                  <button
                    className="edit-profile-button"
                    onClick={() => {
                      setEditing(true);
                      setMessage("");
                    }}
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <div className="edit-profile-form">

                  <div className="edit-profile-field">
                    <label>Name</label>

                    <input
                      type="text"
                      value={name}
                      onChange={(event) =>
                        setName(event.target.value)
                      }
                    />
                  </div>

                  <div className="edit-profile-field">
                    <label>Email</label>

                    <input
                      type="email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                    />
                  </div>

                  <div className="edit-profile-actions">

                    <button
                      className="save-profile-button"
                      onClick={updateProfile}
                      disabled={saving}
                    >
                      {saving
                        ? "Saving..."
                        : "Save Changes"}
                    </button>

                    <button
                      className="cancel-profile-button"
                      onClick={() => {
                        setEditing(false);
                        setName(user.name);
                        setEmail(user.email);
                        setMessage("");
                      }}
                    >
                      Cancel
                    </button>

                  </div>

                  {message && (
                    <p className="profile-message">
                      {message}
                    </p>
                  )}

                </div>
              )}

            </div>

          </div>
        ) : (
          <p>Unable to load profile.</p>
        )}

      </main>

    </div>
  );
}
