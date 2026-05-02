import { formatDistanceToNow, format, isToday, isYesterday } from 'date-fns'
import type { ItemStatus, Priority, NotificationType, ItemType } from './types'

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true })
  }
  if (isYesterday(date)) {
    return 'Yesterday'
  }
  return format(date, 'MMM d')
}

export function formatFullDate(dateString: string): string {
  return format(new Date(dateString), 'MMM d, yyyy · h:mm a')
}

export const STATUS_CONFIG: Record<
  ItemStatus,
  { label: string; className: string }
> = {
  proposed: {
    label: 'Proposed',
    className: 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
  },
  in_review: {
    label: 'In Review',
    className: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
  },
  approved: {
    label: 'Approved',
    className: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-500/15 text-red-400 border border-red-500/25',
  },
  done: {
    label: 'Done',
    className: 'bg-white/6 text-slate-400 border border-white/10',
  },
}

export const PRIORITY_CONFIG: Record<
  Priority,
  { label: string; className: string; dot: string }
> = {
  normal: {
    label: 'Normal',
    className: 'text-slate-500',
    dot: 'bg-slate-600',
  },
  high: {
    label: 'High',
    className: 'text-amber-400',
    dot: 'bg-amber-400',
  },
  urgent: {
    label: 'Urgent',
    className: 'text-red-400',
    dot: 'bg-red-400',
  },
}

export const TYPE_CONFIG: Record<
  ItemType,
  { label: string; color: string }
> = {
  draft: { label: 'Draft', color: '#5B9CF6' },
  idea: { label: 'Idea', color: '#A78BFA' },
  file: { label: 'File', color: '#F59E0B' },
  task: { label: 'Task', color: '#10B981' },
}

export const NOTIFICATION_CONFIG: Record<
  NotificationType,
  { label: string; color: string }
> = {
  vip_email:       { label: 'VIP Email',       color: '#F59E0B' },
  approval_needed: { label: 'Approval Needed', color: '#5B9CF6' },
  idea_proposed:   { label: 'New Idea',        color: '#A78BFA' },
  task_complete:   { label: 'Task Complete',   color: '#10B981' },
  alert:           { label: 'Alert',           color: '#F43F5E' },
}

export const DEFAULT_PROJECTS = [
  { slug: 'digital-ravagers',  name: 'Digital Ravagers',     color: '#EF4444', emoji: '⚡', description: 'AI content and automation systems' },
  { slug: 'creative-grooves',  name: 'Creative Grooves Inc', color: '#EC4899', emoji: '🎵', description: 'Music and CGI record label' },
  { slug: 'cgi-persona-dark',  name: 'Dark DJ Persona',      color: '#8B5CF6', emoji: '🎧', description: 'AI DJ persona - dark house niche' },
  { slug: 'cgi-persona-wellness', name: 'Wellness Persona',  color: '#10B981', emoji: '🌿', description: 'AI wellness sound persona' },
  { slug: 'george-of-jungle',  name: 'George Of This Jungle', color: '#F59E0B', emoji: '🌴', description: 'Mind and money content platform' },
  { slug: 'money-man',         name: 'The Money Man',        color: '#3B82F6', emoji: '💰', description: 'Financial education and wealth building' },
  { slug: 'employee-school',   name: 'Employee School',      color: '#06B6D4', emoji: '🏫', description: 'Psychology-backed education' },
  { slug: 'manus-credits',     name: 'Manus Credits',        color: '#EF4444', emoji: '⚡', description: 'Daily credit burn tracking' },
  { slug: 'personal',          name: 'Personal / Life',      color: '#6366F1', emoji: '🧠', description: 'Personal goals, health, relationships' },
  { slug: 'agi-system',        name: 'AGI System',           color: '#1E293B', emoji: '🤖', description: 'Dashboard infrastructure and automation' },
]

export type ProjectInfo = { slug: string; name: string; color: string; emoji?: string; description?: string }

export function getFileTypeKey(fileType?: string | null): string {
  if (!fileType) return 'generic'
  if (fileType.includes('image')) return 'image'
  if (fileType.includes('pdf')) return 'pdf'
  if (fileType.includes('csv') || fileType.includes('sheet')) return 'spreadsheet'
  if (fileType.includes('markdown') || fileType === 'text/plain') return 'text'
  if (fileType.includes('html')) return 'web'
  if (fileType.includes('zip') || fileType.includes('archive')) return 'archive'
  return 'generic'
}
