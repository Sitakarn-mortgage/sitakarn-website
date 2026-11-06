/**
 * parseTeamTxt
 * Parses the flat-text team roster at /data/team.txt into TeamMember objects.
 *
 * File format (one member per line):
 *   field: value; field: value; ...
 *
 * Array fields (qualifications, specializations) use | as an item separator:
 *   qualifications: CPA|B.Acc. XYZ University
 *
 * Lines that are blank or start with # are ignored.
 */

import type { TeamMember, TeamRole } from '@/types';

function parseLine(line: string): TeamMember | null {
  line = line.trim();
  if (!line || line.startsWith('#')) return null;

  const record: Record<string, string> = {};

  // Split on "; " but only when followed by a known key pattern (word: )
  // to avoid splitting on semicolons inside bio text.
  // Strategy: split on the pattern /;\s*(?=\w[\w\s]*:)/ so we only break
  // where the next segment looks like "key: ..."
  const segments = line.split(/;\s*(?=\w[\w &]+:)/);

  for (const segment of segments) {
    const colonIdx = segment.indexOf(':');
    if (colonIdx === -1) continue;
    const key = segment.slice(0, colonIdx).trim();
    const value = segment.slice(colonIdx + 1).trim();
    record[key] = value;
  }

  if (!record['id'] || !record['name']) return null;

  const arrayField = (field: string): string[] =>
    record[field] ? record[field].split('|').map((s) => s.trim()).filter(Boolean) : [];

  return {
    id: record['id'],
    name: record['name'],
    title: record['title'] ?? '',
    department: record['department'] ?? '',
    role: (record['role'] ?? 'consultant') as TeamRole,
    bio: record['bio'] ?? '',
    qualifications: arrayField('qualifications'),
    imageUrl: record['imageUrl'] ?? '',
    linkedin: record['linkedin'] ?? undefined,
    email: record['email'] ?? undefined,
    yearsOfExperience: parseInt(record['yearsOfExperience'] ?? '0', 10),
    specializations: arrayField('specializations'),
  };
}

export async function fetchAndParseTeam(): Promise<TeamMember[]> {
  const response = await fetch('/data/team.txt');
  if (!response.ok) {
    throw new Error(`Failed to load team data: ${response.status} ${response.statusText}`);
  }
  const text = await response.text();
  return text
    .split('\n')
    .map(parseLine)
    .filter((m): m is TeamMember => m !== null);
}
