"use server"
import { redirect, notFound } from 'next/navigation';
import getCollection, { LINKS_COLLECTION} from "@/mongodb";

export default async function AliasPage({ params }: { params: Promise<{ alias: string }> }) {
    const { alias } = await params;

    const collection = await getCollection(LINKS_COLLECTION);
    const doc = await collection.findOne({ alias });

    if (!doc) {
        notFound();
    }

    redirect(doc.url);
}
