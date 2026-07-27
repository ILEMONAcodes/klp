"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getExecutives() {
  try {
    return await prisma.executive.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching executives:", error);
    return [];
  }
}

export async function createExecutive(formData: FormData) {
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const bio = formData.get("bio") as string;
  const image = formData.get("image") as string;
  const phone = formData.get("phone") as string;
  const email = formData.get("email") as string;

  await prisma.executive.create({
    data: {
      name,
      role,
      bio,
      image,
      phone,
      email,
    },
  });

  revalidatePath("/admin/executives");
  redirect("/admin/executives");
}

export async function deleteExecutive(formData: FormData) {
  const id = formData.get("id") as string;
  await prisma.executive.delete({ where: { id } });
  revalidatePath("/admin/executives");
}