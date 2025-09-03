import VdoCipherPlayer from "@/components/VdoCipherPlayer.tsx";

export default function Dashboard() {
  // ⚠️ NÃO deixe OTP/playbackInfo hardcoded em produção (veja nota abaixo)
  const otp =
    "20160313versASE313c63a68c96144b8d770464f6bac27531b38825875e952ca";
  const playbackInfo =
    "eyJ2aWRlb0lkIjoiMTA0MWVkNThjZDU0NGY5YmE2MGEzYWE1ZGEzZjExZWYifQ==";

  return (
    <main className="p-6">
      <VdoCipherPlayer
        otp={otp}
        playbackInfo={playbackInfo}
        configuration={
          {
            // autoplay: true,
          }
        }
      />
    </main>
  );
}
