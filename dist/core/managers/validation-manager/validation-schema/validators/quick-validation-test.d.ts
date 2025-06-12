/**
 * Quick validation test for country-specific validators
 * This is a simplified test that can run without TypeScript compilation issues
 */
declare function test(name: any, fn: any): void;
declare function assertEquals(actual: any, expected: any, message: any): void;
declare function testSwissPhonePattern(): void;
declare function testSwissNPAPattern(): void;
declare function testSwissAHVPattern(): void;
declare function testGermanPhonePattern(): void;
declare function testUSPhonePattern(): void;
declare function testMultipleCountryPatterns(): void;
