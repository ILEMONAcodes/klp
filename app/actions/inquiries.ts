"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 1. GET ALL INQUIRIES
export async function getInquiries() {
  try {
    return await prisma.inquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return [];
  }
}

// 2. CREATE AN INQUIRY (For Frontend Contact Form)
export async function createInquiry(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = (formData.get("phone") as string) || "";
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      return { success: false, error: "Please fill in all required fields." };
    }

    await prisma.inquiry.create({
      data: { name, email, phone, message },
    });

    revalidatePath("/admin/inquiries");
    return { success: true };
  } catch (error) {
    console.error("Error submitting inquiry:", error);
    return { success: false, error: "Failed to submit inquiry." };
  }
}

// 3. DELETE AN INQUIRY
export async function deleteInquiry(id: string) {
  try {
    await prisma.inquiry.delete({
      where: { id },
    });

    revalidatePath("/admin/inquiries");
  } catch (error) {
    console.error("Error deleting inquiry:", error);
  }
}