export const TestTag = {
    // Run test using tag, https://playwright.dev/docs/test-annotations#tag-tests
    // npx playwright test --grep @regression
  
    // Or if you want the opposite, you can skip the tests with a certain tag:
    // npx playwright test --grep-invert @fast
  
    // To run tests containing either tag (logical OR operator):
    // npx playwright test --grep "@fast^|@slow"
  
    // Or run tests containing both tags (logical AND operator) using regex lookaheads:
    // npx playwright test --grep "(?=.*@fast)(?=.*@slow)"
    testLevel_regression: '@regression',
    testLevel_sanity: '@sanity',
    testLevel_e2e: '@e2e',
    testLevel_pr_check: '@prCheck',

    test_positive:'@positive',
    test_negative:'@negative',
}