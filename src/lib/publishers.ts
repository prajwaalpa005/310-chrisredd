/**
 * Publisher lookups for build-time storefront data.
 *
 * These helpers query the SQLite database for publisher metadata used by static pages and
 * listing views. Keep the database access layer injectable and deterministic for tests.
 */
import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Fetch all publishers sorted alphabetically by name.
 *
 * @param db - Database connection used to read publisher rows.
 * @returns Every publisher record ordered by name ascending.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({
            id: publishers.id,
            name: publishers.name,
        })
        .from(publishers)
        .orderBy(asc(publishers.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
