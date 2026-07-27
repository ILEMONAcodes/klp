"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 1. GET ALL PROPERTIES
export async function getProperties() {
  try {
    return await prisma.property.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw new Error("Failed to fetch properties.");
  }
}

// 2. GET PROPERTY BY ID
export async function getPropertyById(id: string) {
  try {
    const property = await prisma.property.findUnique({
      where: { id },
    });
    return property;
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

// Helper function to safely parse images format
function parseImagesInput(imagesRaw: string | null): string {
  if (!imagesRaw) return "";
  try {
    const parsed = JSON.parse(imagesRaw);
    if (Array.isArray(parsed)) {
      return parsed.join(",");
    }
    return String(parsed);
  } catch {
    return imagesRaw;
  }
}

// 3. CREATE A PROPERTY
export async function createProperty(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priceRaw = formData.get("price") as string;
  const location = formData.get("location") as string;
  const type = formData.get("type") as string;
  const status = (formData.get("status") as string) || "Available";
  const isFeatured = formData.get("isFeatured") === "true";

  // Parse Images
  const imagesRaw = formData.get("images") as string;
  const images = parseImagesInput(imagesRaw);

  // Parse Numbers
  const price = priceRaw ? parseFloat(priceRaw) : 0;
  const bedroomsRaw = formData.get("bedrooms") as string;
  const bathroomsRaw = formData.get("bathrooms") as string;

  const bedrooms = bedroomsRaw ? parseInt(bedroomsRaw, 10) : null;
  const bathrooms = bathroomsRaw ? parseInt(bathroomsRaw, 10) : null;

  // Convert lat/lng to Float (Number) to match Prisma schema
  const latitudeRaw = formData.get("latitude") as string;
  const longitudeRaw = formData.get("longitude") as string;
  const latitude =
    latitudeRaw && !isNaN(parseFloat(latitudeRaw))
      ? parseFloat(latitudeRaw)
      : null;
  const longitude =
    longitudeRaw && !isNaN(parseFloat(longitudeRaw))
      ? parseFloat(longitudeRaw)
      : null;

  const propertySize = (formData.get("propertySize") as string) || null;
  const features = (formData.get("features") as string) || "";
  const landmarks = (formData.get("landmarks") as string) || "";

  try {
    await prisma.property.create({
      data: {
        title,
        description,
        price,
        location,
        type,
        status,
        isFeatured,
        images,
        latitude,
        longitude,
        bedrooms,
        bathrooms,
        propertySize,
        features,
        landmarks,
      },
    });

    revalidatePath("/");
    revalidatePath("/properties");
    revalidatePath("/admin/properties");
  } catch (error) {
    console.error("Error creating property in DB:", error);
    throw new Error("Failed to create property in database.");
  }

  redirect("/admin/properties");
}

// 4. UPDATE A PROPERTY
export async function updateProperty(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const priceRaw = formData.get("price") as string;
  const location = formData.get("location") as string;
  const type = formData.get("type") as string;
  const status = (formData.get("status") as string) || "Available";
  const isFeatured = formData.get("isFeatured") === "true";

  const imagesRaw = formData.get("images") as string;
  const images = parseImagesInput(imagesRaw);

  const price = priceRaw ? parseFloat(priceRaw) : 0;
  const bedroomsRaw = formData.get("bedrooms") as string;
  const bathroomsRaw = formData.get("bathrooms") as string;

  const bedrooms = bedroomsRaw ? parseInt(bedroomsRaw, 10) : null;
  const bathrooms = bathroomsRaw ? parseInt(bathroomsRaw, 10) : null;

  const latitudeRaw = formData.get("latitude") as string;
  const longitudeRaw = formData.get("longitude") as string;
  const latitude =
    latitudeRaw && !isNaN(parseFloat(latitudeRaw))
      ? parseFloat(latitudeRaw)
      : null;
  const longitude =
    longitudeRaw && !isNaN(parseFloat(longitudeRaw))
      ? parseFloat(longitudeRaw)
      : null;

  const propertySize = (formData.get("propertySize") as string) || null;
  const features = (formData.get("features") as string) || "";
  const landmarks = (formData.get("landmarks") as string) || "";

  try {
    await prisma.property.update({
      where: { id },
      data: {
        title,
        description,
        price,
        location,
        type,
        status,
        isFeatured,
        images,
        latitude,
        longitude,
        bedrooms,
        bathrooms,
        propertySize,
        features,
        landmarks,
      },
    });

    revalidatePath("/");
    revalidatePath("/properties");
    revalidatePath(`/properties/${id}`);
    revalidatePath("/admin/properties");
  } catch (error) {
    console.error("Error updating property:", error);
    throw new Error("Failed to update property.");
  }

  redirect("/admin/properties");
}

// 5. DELETE A PROPERTY (Flexible to accept string ID or FormData)
export async function deleteProperty(input: string | FormData) {
  const id = typeof input === "string" ? input : (input.get("id") as string);

  if (!id) return;

  try {
    await prisma.property.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/properties");
    revalidatePath("/admin/properties");
  } catch (error) {
    console.error("Error deleting property:", error);
  }
}