import { supabase } from "../assets/database/supabaseconfig";

const TABLE = "user_progress_data";

export async function getProgress(userId) {
	if (!userId) return {};

	const { data, error } = await supabase
		.from(TABLE)
		.select("data")
		.eq("user_id", userId)
		.single();

	if (error && error.code !== "PGRST116") {
		console.error("Error fetching progress:", error);
		return {};
	}

	return data?.data ?? {};
}

export async function saveProgress(userId, progreso) {
	if (!userId) return null;

	const payload = {
		user_id: userId,
		data: progreso,
		updated_at: new Date().toISOString(),
	};

	const { error } = await supabase.from(TABLE).upsert(payload, {
		onConflict: "user_id",
	});

	if (error) {
		console.error("Error saving progress:", error);
		return null;
	}

	return true;
}

export default {
	getProgress,
	saveProgress,
};

