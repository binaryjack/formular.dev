/\*\*Event Handling Redundancy in ContentEditable Components
Great question about adding redundancy in event handling! This is specifically
important for contentEditable elements, which are notoriously tricky.
Here's why I suggested using both React event props and DOM event listeners:

Why the Redundancy Is Helpful
ContentEditable Quirks: ContentEditable has long-standing browser inconsistencies.
It was designed before modern frameworks existed, and different browsers implement
it differently.

Event Timing: React's synthetic events and native DOM events can sometimes
fire in slightly different orders or with subtle timing differences
when working with contentEditable:

Capturing All Changes: Some contentEditable changes don't reliably trigger
React's synthetic events in all browsers.
Having both ensures you don't miss updates.

Mobile vs Desktop: Mobile browsers in particular can have unique
behaviors with contentEditable that might be caught by one system but not the other.

Real-World Example
I've seen cases where:

A paste operation triggered the DOM event but not the React event in Safari
Selection changes were captured differently between the two systems
IME (Input Method Editor) input for languages like Chinese or Japanese
was handled inconsistently
Best Approach
For most React components, this redundancy would be unnecessary
and even discouraged. But for contentEditable specifically,
it's a defensive pattern that many rich text editors use.

If you find your component works consistently across browsers
with just the React events, you can certainly remove the redundancy.
But if you're planning to support many browsers and platforms,
the belt-and-suspenders approach can save you debugging headaches later.
\*/
