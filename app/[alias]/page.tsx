import { redirect } from 'next/navigation';
import getCollection, { LINKS_COLLECTION} from "@/mongodb";

interface AliasPageProps {
    params: {
        alias: string;
    };
}

// Dynamic route page that handles /[alias]
export default async function AliasPage({ params }: AliasPageProps) {
    const collection = await getCollection(LINKS_COLLECTION);

    // Find the original URL for the given alias
    const doc = await collection.findOne({ alias: params.alias });

    if (!doc) {
        // Alias not found – show a 404-style fallback
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold text-red-600">404 - Link Not Found</h1>
            </div>
        );
    }

    // Redirect the user to the original URL
    redirect(doc.url);
}
