<skill name="Rust Absolute Best Practices">
    <practice id="1" title="Zero Warnings Policy">
        - You must always run `cargo clippy --workspace --all-targets --all-features -- -D warnings`.
        - Code is NEVER considered complete if it produces warnings.
    </practice>
    
    <practice id="2" title="Workspace Dependency Management">
        - ALL external dependencies must be listed in the root `Cargo.toml` under `[workspace.dependencies]`.
        - Sub-crates must reference dependencies using `{ workspace = true }`.
        - Inline `path = "..."` dependencies are strictly forbidden in nested `Cargo.toml` files.
    </practice>
    
    <practice id="3" title="Strict Boundary Enforcement">
        - Paths must not escape the workspace root (no `path = "../../../"` out of the repository).
        - **Engine Purity**: Low-level engine crates (the core logic/computation) MUST NEVER depend on high-level orchestration, UI, or business logic crates.
        - High-level crates (e.g., `codernic`, `galileus`, `pirsig`) may orchestrate engines but must respect dependency inversion.
    </practice>
    
    <practice id="4" title="General Idioms">
        - Favor `Result` and `Option` over panicking (`unwrap()`, `expect()`). Only panic if an invariant is fundamentally broken.
        - Break large modules down. Avoid god objects or files that exceed reasonable complexity.
    </practice>
</skill>
