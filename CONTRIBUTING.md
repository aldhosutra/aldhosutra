# Contributing

Thanks for helping improve **Cat Care** README games 🐱

This project grows through small, well-designed TypeScript challenges that are fun, readable, and intuitive.

Please follow the guidelines below to keep everything consistent.

---

## Adding a New Challenge Snippet

Each challenge is a **single TypeScript file** and represents **one option** the player can choose in the game.

### 📁 Folder Structure

Add your file under:

```
challenges/<action>/<variant>/
```

---

### Supported actions & variants:

#### 🐛 Feed (Bug vs Not-Bug)

```
challenges/feed/bug/
challenges/feed/not-bug/
```

In this project:

- **Bug code** = something is _clearly wrong_
- **Not-bug code** = works as expected

The player’s goal is to **find the buggy code** to feed the cat.

##### Examples of **bug code**:

- Off-by-one errors
- Wrong comparison or condition
- Incorrect return value
- Logic that breaks for certain inputs
- Code that looks right but behaves wrong

##### Examples of **not-bug code**:

- Correct logic
- Reasonable edge-case handling
- Clear and expected behavior

Avoid trick questions.
If the bug is too subtle, it won’t feel fun.

---

#### 🛁 Bath (Warm vs Not-Warm)

```
challenges/bath/warm/
challenges/bath/not-warm/
```

In this project:

- **Warm code** = ready to run immediately
- **Not-warm (cold) code** = still needs preparation

Think in terms of **warm start vs cold start**.

##### Examples of **warm code**:

- Fully initialized logic
- Pure functions
- No async setup or loading required
- Everything needed is already available

##### Examples of **not-warm code**:

- Depends on async setup or loading
- Requires configuration before running
- Lazy initialization that hasn’t happened yet
- Execution blocked on unresolved promises

The cat loves **warm baths**, not waiting for water to heat up.

---

#### 🪮 Pet (Clean vs Not-Clean)

```
challenges/pet/clean/
challenges/pet/not-clean/
```

In this project:

- **Clean code** = pleasant to read and easy to understand
- **Not-clean code** = messy, confusing, or uncomfortable to read

The player’s goal is to **choose the cleanest code** to pet the cat.

##### Examples of **clean code**:

- Clear function and variable names
- Simple control flow
- Easy to understand at a glance
- Does one thing well

##### Examples of **not-clean code**:

- Poor or misleading naming
- Unnecessary nesting
- Confusing logic
- Hard to follow without rereading

Clean code feels like a **clean comb**, smooth and comfortable.

---

## 🧩 Required Code Template

Every challenge file **must follow this exact structure**:

```ts
// REASON: {Explain clearly why this code is correct or incorrect for its variant}
export function functionName() {
	// {code snippet here}
}

// {end with a single empty line}
```

### Rules:

- The `REASON` comment is **required**
- Keep snippets **short and readable**
- Avoid imports and external dependencies
- End the file with **one empty line**

---

## 🎯 Variant Accuracy

Make sure your code clearly matches its folder:

- A `bug` should obviously break
- A `warm` snippet should feel immediately runnable
- A `clean` snippet should be pleasant to read

If it’s ambiguous, the challenge won’t feel fun.

---

## ✅ Before You Submit

Please check:

- [ ] File is in the correct folder
- [ ] Filename is descriptive
- [ ] `REASON` explains the choice clearly
- [ ] Code matches the variant meaning
- [ ] File ends with one empty line

---

## 💡 Tips

- Simpler is better than clever
- Avoid trick questions
- Think like a cat, clarity beats chaos 🐾

---

Thanks for contributing and keeping the cat happy 😸

Every good snippet is a good bug, bath, or comb.
