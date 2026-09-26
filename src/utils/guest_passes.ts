
export function build_passes_string(
    used: number,
    total: number,
    today: number,
    force_today: boolean = false
) {
    let message = `You have used ${used} of ${total} guest passes this season`;
    if (force_today || today > 0) {
        message += ` (${today} used today)`;
    }
    message += ".";
    return message;
}
