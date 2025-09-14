import { config } from 'dotenv';
config();

import '@/ai/flows/real-time-conflict-detection.ts';
import '@/ai/flows/smart-timetable-generation.ts';
import '@/ai/flows/dynamic-timetable-adjustment.ts';
import '@/ai/flows/ask-timetable-flow.ts';
import '@/ai/flows/tts-flow.ts';
