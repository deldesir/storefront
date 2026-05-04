import nextDynamic from "next/dynamic";
import { generateMetadataForPage } from "@utils/helper";
import { staticSeo } from "@utils/metadata";
import { Suspense } from "react";
import ForgetSkeleton from "@components/common/skeleton/ForgetSkeleton";
const ForgetPasswordForm = nextDynamic(() => import("@components/customer/ForgetPassword"));

export const revalidate = 3600;
export const dynamic = "force-dynamic";
export async function generateMetadata() {
  return generateMetadataForPage("", staticSeo.forget);
}

export default function ForgetPasswordPage() {
  return (
    <Suspense fallback={<ForgetSkeleton />}>
      <ForgetPasswordForm />
    </Suspense>
  );
}
