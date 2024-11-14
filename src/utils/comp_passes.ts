/**
 * Enum for different types of comp passes.
 * @enum {string}
 */
export enum CompPassType {
    CompPass = "comp-pass",
    ManagerPass = "manager-pass",
}

/**
 * Get the description for a given comp pass type.
 * @param {CompPassType} type - The type of the comp pass.
 * @returns {string} The description of the comp pass type.
 */
export function get_comp_pass_description(type: CompPassType): string {
    switch (type) {
        case CompPassType.CompPass:
            return "Comp Pass";
        case CompPassType.ManagerPass:
            return "Manager Pass";
    }
    return "";
}

export function build_passes_string(
    used: number,
    total: number,
    today: number,
    type: string,
    force_today: boolean = false
) {
    let message = `You have used ${used} of ${total} ${type} this season`;
    if (force_today || today > 0) {
        message += ` (${today} used today)`;
    }
    message += ".";
    return message;
}
