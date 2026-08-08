import { revalidatePath, revalidateTag } from "next/cache";

export function invalidateContentCache(tags: string[], paths: string[] = ["/"]) {
  try {
    for (const tag of tags) {
      // Next.js revalidateTag Signature
      (revalidateTag as any)(tag);
    }
    for (const path of paths) {
      revalidatePath(path);
    }
  } catch {
    // Ignore cache invalidation errors when running outside Next server context
  }
}
