<skill name="Testing & Verification Absolute Best Practices">
    <practice id="1" title="Zero Guessing">
        - You must never guess. If you do not know the state of the codebase, read the files or run a test.
        - Verify all assumptions before claiming a task is done.
    </practice>
    
    <practice id="2" title="Strict Testing Policy">
        - Never claim something is fixed if it has not been tested locally.
        - For backend code: Write unit tests `#[test]` and run `cargo test`.
        - For frontend code: Validate that components mount and behave correctly in tests.
    </practice>
    
    <practice id="3" title="Proactive Test Creation">
        - Whenever you modify a feature or create a new one, you MUST propose to write tests for it.
        - If fixing a bug, write a regression test that fails before your fix and passes after.
    </practice>
</skill>
