import { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	type ButtonVariants = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
	type Sizes = 'default' | 'sm' | 'lg' | 'icon';
	namespace App {
		interface Locals {
			supabase: SupabaseClient;
			getSession(): Promise<Session | null>;
		}
		interface PageData {
			session: Session | null;
		}
	}
}

export {};
