import { SectionConfig } from '../env/handler_config';

/**
    * Class for section values.
    */
class SectionValues {
    section_config: SectionConfig
    sections: string[];
    lowercase_sections: string[];

    constructor(section_config: SectionConfig) {
        this.section_config = section_config;
        this.sections = section_config.SECTION_VALUES.split(',');
        this.lowercase_sections = section_config.SECTION_VALUES.toLowerCase().split(',');
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
    parse_section(body: string | null): string | null {
        if (body === null) {
            return null;
        }
         return this.lowercase_sections.includes(body.toLowerCase()) ? body : null;
    }

    /**
    * Maps a lower case version of a section string to the original case value.
    * @param {string} section - The lower case section string.
    * @returns {string } The original case value if found, otherwise null.
    */
   map_section(section: string | null): string  {
       if (section === null) {
           return "";
       }
       const index = this.lowercase_sections.indexOf(section.toLowerCase());
       if (index !== -1) {
           return this.sections[index];
       }
       return "";
   }

}

export { SectionValues };