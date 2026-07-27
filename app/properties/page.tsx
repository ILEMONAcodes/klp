import { getProperties } from "@/app/actions/properties";
import PropertiesClient from "./PropertiesClient";

export const revalidate = 0; // Fresh database data on every view

export default async function PublicPropertiesPage() {
  const properties = await getProperties();

  return <PropertiesClient initialProperties={properties} />;
}