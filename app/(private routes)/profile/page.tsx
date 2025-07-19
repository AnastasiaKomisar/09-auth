import { Metadata } from 'next';
import Link from "next/link";
import Image from "next/image";
import { getMeServer } from "@/lib/api/serverApi";
import css from './ProfilePage.module.css';

export const generateMetadata = async (): Promise<Metadata> => {
  const { username, avatar } = await getMeServer();

  return {
    title: username,
    description: `Profile of ${username}`,

    openGraph: {
      title: username,
      description: `Profile of ${username}`,
      url: `https://09-auth-beta-orpin.vercel.app`,
      siteName: "NoteHub",
      images: [
        {
          url: avatar || "/default-avatar.jpg",
          width: 1200,
          height: 630,
          alt: "NoteHub App",
        },
      ],
      type: "article",
    },
  };
};

export default async function ProfilePage() {
   const { username, email, avatar } = await getMeServer();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={avatar || "/default-avatar.jpg"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
        </div>
      </div>
    </main>
  );
}