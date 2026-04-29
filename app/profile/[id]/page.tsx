export default function UserProfile({ params }: any) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-slate-950 px-4 py-8 text-white">
      <h1 className="text-3xl font-bold">User Profile</h1>
      <p className="rounded-xl bg-amber-400 px-4 py-2 font-medium text-slate-900">
        String ID: {params.id}
      </p>
      <p className="text-slate-300"></p>
    </div>
  );
}
