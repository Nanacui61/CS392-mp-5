"use server";

import getCollection, { LINKS_COLLECTION} from "../mongodb";

// Define the shape of the document
export interface LinkEntry {
    alias: string;
    url: string;
}

// Validate a URL string
function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Server Action to create a new short link
export default async function createLink({
                                             alias,
                                             url,
                                         }: LinkEntry): Promise<{ alias?: string; url?: string; id?: string; error?: string }> {
    if (!alias || !url) {
        return { error: "Alias and URL are required." };
    }

    if (!isValidUrl(url)) {
        return { error: "Invalid URL format." };
    }

    const linksCollection = await getCollection(LINKS_COLLECTION);

    // Check for duplicate alias
    const existing = await linksCollection.findOne({ alias });
    if (existing) {
        return { error: "Alias already taken." };
    }

    // Insert new alias–URL mapping
    const result = await linksCollection.insertOne({ alias, url });

    if (!result.acknowledged) {
        return { error: "Database insert failed." };
    }

    return {
        alias,
        url,
        id: result.insertedId.toHexString(),
    };
}
