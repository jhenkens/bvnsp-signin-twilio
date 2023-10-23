
export enum CompPassType {
    CompPass = "comp-pass",
    ManagerPass = "manager-pass",
}

export function get_comp_pass_description(type: CompPassType) {
    switch (type) {
        case CompPassType.CompPass:
            return "Comp Pass";
        case CompPassType.ManagerPass:
            return "Manager Pass";
    }
    return "";
}
