import { SectionConfig } from '../env/handler_config';

/**
    * Class for section values.
    */
class SectionValues {
    section_config: SectionConfig
    sections: string[];

    constructor(section_config: SectionConfig) {
        this.section_config = section_config;
        this.sections = section_config.SECTION_VALUES.split(',');
    }

    /**
     * Gets the section description.
     * @returns {string} The section description.
    */
    get_section_description(): string {
        return this.section_config.SECTION_VALUES;
    }

    /**
    * Parses a section.
    * @param {string} body - The body of the request.
    * @returns {string | null} The section if it is a valid section or null.
    */
    parse_section(body: string): string | null {
         return this.sections.includes(body) ? body : null;
    }
}

export { SectionValues };