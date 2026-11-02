/**
 * Team API
 * Fetches team members from Strapi CMS.
 * Falls back to the local text-file parser when CMS is not configured.
 */

import type { APIResponse, TeamMember, TeamRole } from '@/types';
import { fetchAndParseTeam } from '@/utils/parseTeamTxt';
import { isCmsEnabled, fetchCollection, getStrapiMediaUrl } from '@/lib/strapi';

// ─── Strapi → App type mapper ────────────────────────────────────────────────

function mapTeamMember(d: Record<string, unknown>): TeamMember {
  // Handle Strapi media relation for imageUrl
  const image = d.image as Record<string, unknown> | undefined;
  const imageUrl = image?.url
    ? getStrapiMediaUrl(image.url as string)
    : (d.imageUrl as string) ?? '';

  return {
    id: String(d.documentId ?? d.id ?? ''),
    name: (d.name as string) ?? '',
    title: (d.title as string) ?? '',
    department: (d.department as string) ?? '',
    role: (d.role as TeamRole) ?? 'consultant',
    bio: (d.bio as string) ?? '',
    qualifications: Array.isArray(d.qualifications) ? d.qualifications as string[] : [],
    imageUrl,
    linkedin: (d.linkedin as string) ?? undefined,
    email: (d.email as string) ?? undefined,
    yearsOfExperience: (d.yearsOfExperience as number) ?? 0,
    specializations: Array.isArray(d.specializations) ? d.specializations as string[] : [],
  };
}

// ─── API methods ─────────────────────────────────────────────────────────────

export const TeamAPI = {
  async getAll(): Promise<APIResponse<TeamMember[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('team-members', {
          populate: '*',
          sort: 'order:asc',
          pagination: { pageSize: 100 },
        });
        return {
          data: res.data.map(mapTeamMember),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[TeamAPI.getAll] CMS fetch failed, using fallback:', err);
      }
    }
    const data = await fetchAndParseTeam();
    return {
      data,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getByRole(role: TeamRole): Promise<APIResponse<TeamMember[]>> {
    if (isCmsEnabled) {
      try {
        const res = await fetchCollection<Record<string, unknown>>('team-members', {
          filters: { role: { $eq: role } },
          populate: '*',
          sort: 'order:asc',
          pagination: { pageSize: 100 },
        });
        return {
          data: res.data.map(mapTeamMember),
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[TeamAPI.getByRole] CMS fetch failed, using fallback:', err);
      }
    }
    const data = await fetchAndParseTeam();
    return {
      data: data.filter((m) => m.role === role),
      success: true,
      timestamp: new Date().toISOString(),
    };
  },

  async getById(id: string): Promise<APIResponse<TeamMember | null>> {
    if (isCmsEnabled) {
      try {
        const isNum = /^\d+$/.test(id.trim());
        const filters = isNum
          ? { $or: [{ documentId: { $eq: id } }, { id: { $eq: Number(id) } }] }
          : { documentId: { $eq: id } };
        const res = await fetchCollection<Record<string, unknown>>('team-members', {
          filters,
          populate: '*',
          pagination: { pageSize: 1 },
        });
        const first = res.data[0] ?? null;
        return {
          data: first ? mapTeamMember(first) : null,
          success: true,
          timestamp: new Date().toISOString(),
        };
      } catch (err) {
        console.warn('[TeamAPI.getById] CMS fetch failed, using fallback:', err);
      }
    }
    const data = await fetchAndParseTeam();
    const member = data.find((m) => m.id === id) ?? null;
    return {
      data: member,
      success: true,
      timestamp: new Date().toISOString(),
    };
  },
};
