import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ThreadCard from "@/components/cards/ThreadCard";



import { fetchThreads } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/users.actions";

async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchThreads(
    searchParams.page ? +searchParams.page : 1,
    30
  );
  console.log( result );

  return (
    <>
      <h1 className='head-text text-left'>Home</h1>

      <section className='mt-9 flex flex-col gap-10'>
        {result.threads.length === 0 ? (
          <p className='no-result'>No threads found</p>
        ) : (
          <>
            {result.threads.map((post) => (
             <ThreadCard 
             key = {post._id}
             id={post._id}
             currentUserId={user?.id}
             parentId={post.parentId}
             content={post.text}
             author={post.author}
             community={post.community}
             createdAt={post.createdAt}
             comments={post.children}

             />
            ))}
          </>
        )}
      </section>
    </>
  );
}

export default Home;