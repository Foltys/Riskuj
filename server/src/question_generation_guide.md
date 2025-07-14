# Czech Trivia Question Generation Guide

This guide provides comprehensive instructions for AI assistants to generate high-quality questions for the Czech trivia game "Riskuj2".

## Question Schema

Each question must follow this exact TypeScript interface:

```typescript
interface Question {
  id: number;
  text: string;
  answers: string[];
  leven: number;
  points: number;
}

interface Category {
  id: number;
  name: string;
  questions: Question[];
}
```

## Field Requirements

### `answers` Array

- **ALWAYS** use `answers` (plural) as an array, never `answer` (singular)
- For person names, include both full name and last name only
  - Example: `["Tomáš Garrigue Masaryk", "Masaryk"]`
  - Example: `["Petra Kvitová", "Kvitová"]`
- For non-person answers, use single-element array: `["Vltava"]`

### `leven` Values

Use these criteria for setting the `leven` field:

**`leven: 0` (Exact match required)**

- Numeric answers: `["1993"]`, `["46"]`, `["4"]`
- Chemical formulas: `["H2O"]`
- Very specific technical terms where typos are unlikely

**`leven: 1` (Allow minor typos)**

- Person names (always leven: 1)
- Place names, geographical terms
- Most other answers where players might make spelling mistakes
- Technical terms that are commonly misspelled

## Question Specificity Requirements

### ❌ AVOID Vague Questions

Never create questions that could have multiple valid answers:

**Bad Examples:**

- "Která česká firma je známá výrobou her?" (Multiple companies exist)
- "Jak se jmenuje slavný český houslista?" (Many famous violinists exist)
- "Který český malíř je známý svými krajinami?" (Many landscape painters exist)

### ✅ CREATE Specific Questions

Always add context, hints, or distinguishing details:

**Good Examples:**

- "Která česká firma je známá výrobou her DayZ a Arma?" (Specifies games)
- "Jak se jmenuje slavný český houslista známý svým nekonvenčním stylem a elektrickou houslí?" (Distinguishing characteristics)
- "Který český malíř impresionista je známý svými krajinami a působil v Paříži?" (Art style and location)

## Specificity Guidelines

### Adding Context

- **Historical figures**: Add their most famous achievement or time period
- **Artists/Musicians**: Reference their most famous work or unique style
- **Companies**: Mention their most famous products or founding year
- **Geographic locations**: Add distinguishing features or historical significance
- **Technical terms**: Include context about usage or discovery

### Examples of Good Context Addition

**Before:** "Kdo byl český prezident?"
**After:** "Kdo byl prvním prezidentem České republiky?"

**Before:** "Která česká hora je nejnavštěvovanější?"
**After:** "Která česká hora je považována za kolébku českého národa podle legendy?"

**Before:** "Který český vědec je známý?"
**After:** "Který český chemik a vynálezce kontaktních čoček získal Nobelovu cenu za chemii?"

## Category Guidelines

### Historie (History)

- Focus on specific dates, events, and key figures
- Include context about why the person/event was important

### Zeměpis (Geography)

- Be specific about measurements, locations, administrative divisions
- Avoid subjective terms like "most beautiful" - use measurable criteria

### Sport

- Include specific achievements, records, or time periods
- Mention specific competitions or teams when relevant

### Kultura (Culture)

- Reference specific works, not just general fame
- Include time periods or movements when relevant

### Filmy (Movies)

- Mention specific films, awards, or years
- Include context about the achievement (Oscar winner, etc.)

### Hudba (Music)

- Reference specific songs, albums, or unique characteristics
- Include musical style or period when relevant

### Jídlo (Food)

- Focus on traditional dishes with clear origins
- Include preparation methods or regional variations

### Věda (Science)

- Include specific discoveries, formulas, or inventions
- Mention Nobel prizes or other major achievements

### Příroda (Nature)

- Use specific biological or geographical classifications
- Include conservation status or unique characteristics

### Umění (Art)

- Reference specific artworks, movements, or techniques
- Include location of famous works or museums

### Politika (Politics)

- Include specific dates, terms, or political changes
- Reference specific legislation or international events

### Technika (Technology)

- Mention specific inventions, companies, or innovations
- Include years of founding or major achievements

## Quality Checklist

Before submitting questions, verify:

- [ ] Question is specific enough to have only one correct answer
- [ ] Context/hints are provided for potentially ambiguous questions
- [ ] `answers` array includes last names for people
- [ ] `leven` value is appropriate (0 for exact, 1 for allowing typos)
- [ ] Points are distributed appropriately (100-600 per category)
- [ ] Question text is clear and grammatically correct
- [ ] All facts are accurate and verifiable

## Common Mistakes to Avoid

1. **Using `answer` instead of `answers`**
2. **Forgetting to include last names for people**
3. **Setting wrong `leven` values**
4. **Creating vague questions with multiple possible answers**
5. **Not providing enough context for disambiguation**
6. **Using subjective terms without objective criteria**
7. **Factual errors (always verify information)**

## Example Question Structure

```typescript
{
  id: 1,
  text: "Která česká firma je známá výrobou her DayZ a Arma?",
  answers: ["Bohemia Interactive"],
  leven: 1,
  points: 500,
}
```

## Final Notes

- Always prioritize question clarity over complexity
- Include enough context to eliminate ambiguity
- Verify all facts before creating questions
- Consider the target audience's knowledge level
- Maintain consistency in difficulty progression within categories
