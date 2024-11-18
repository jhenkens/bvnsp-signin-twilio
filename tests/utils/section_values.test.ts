import { SectionValues } from '../../src/utils/section_values';
import { CONFIG } from '../../src/env/handler_config';

describe('SectionValues', () => {
    let sectionValues: SectionValues;

    beforeEach(() => {
        sectionValues = new SectionValues(CONFIG);
    });

    // get_section_description tests
    test('get_section_description should return the section description', () => {
        expect(sectionValues.get_section_description()).toBe(CONFIG.SECTION_VALUES);
    });

    test('get_section_description should have 7 values when split by comma', () => {
        const description = sectionValues.get_section_description();
        const values = description.split(',');
        expect(values).toHaveLength(7);
    });

    // parse_section tests
    test('parse_section should return the section if it is "4"', () => {
        expect(sectionValues.parse_section('4')).toBe('4');
    });

    test('parse_section should return the section if it is "Roving"', () => {
        expect(sectionValues.parse_section('Roving')).toBe('Roving');
    });

    test('parse_section should return the section if it is "FAR"', () => {
        expect(sectionValues.parse_section('FAR')).toBe('FAR');
    });

    test('parse_section should return the section if it is "Training"', () => {
        expect(sectionValues.parse_section('Training')).toBe('Training');
    });

    test('parse_section should return null for invalid section', () => {
        expect(sectionValues.parse_section('invalid')).toBeNull();
    });

    // map_section tests
    test('map_section should map "far" to "FAR"', () => {
        expect(sectionValues.map_section('far')).toBe('FAR');
    });

    test('map_section should map "Far" to "FAR"', () => {
        expect(sectionValues.map_section('Far')).toBe('FAR');
    });

    test('map_section should map "training" to "Training"', () => {
        expect(sectionValues.map_section('training')).toBe('Training');
    });

    test('map_section should map "TRAINING" to "Training"', () => {
        expect(sectionValues.map_section('TRAINING')).toBe('Training');
    });

    test('map_section should map "roving" to "Roving"', () => {
        expect(sectionValues.map_section('roving')).toBe('Roving');
    });

    test('map_section should map "ROVING" to "Roving"', () => {
        expect(sectionValues.map_section('ROVING')).toBe('Roving');
    });
});