<skill name="React & TypeScript Absolute Best Practices">
    <practice id="1" title="Strict TypeScript Enforcement">
        - The `any` type is completely banned.
        - Stub types or `// @ts-ignore` are not allowed unless explicitly approved by the supervisor with a well-documented reason.
    </practice>
    
    <practice id="2" title="React Component Architecture">
        - Never use `React.FC`.
        - Always declare a specific `interface` for props.
        - Destructure all props directly in the component signature.
        ```tsx
        // Good
        interface ButtonProps {
          label: string;
          onClick: () => void;
        }
        export function Button({ label, onClick }: ButtonProps) {
          return <button onClick={onClick}>{label}</button>;
        }

        // Bad
        export const Button: React.FC<ButtonProps> = (props) => ...
        ```
    </practice>
    
    <practice id="3" title="Atomic Design & Component Reuse">
        - Always check `packages/ui` for existing components before building new ones.
        - Strictly categorize UI elements into Atoms, Molecules, Organisms, Templates, and Pages.
    </practice>
    
    <practice id="4" title="File Organization (FSD)">
        - Follow Feature-Sliced Design.
        - Keep features isolated. Never create God Components. If a file is doing too much (fetching data, handling complex state, rendering deep DOM trees), break it down.
    </practice>
</skill>
