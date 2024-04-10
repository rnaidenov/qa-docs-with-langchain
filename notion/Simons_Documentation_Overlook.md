# Simon’s Documentation overlook

*State for 2024-03-01*

The documentation we need to provide can be sorted by categories:

## Internal Developer documentation

This kind of documentation helps developers within the mobile/tech team to maintain and develop current codebase. This documentation consists of:

1. Guidelines - How to contribute?
2. ADRs (Architectural Decision Records) - Why we are doing things we do?
3. Design documents in the likes of HLD (High Level Design) documents, SDDs (Software Design Descriptions) etc. - How are things currently working?
4. Internal API Reference - How elements of technology can communicate?

## Customer Developer documentation

This kind of documentation allows our customers to use the technology we create - ideally without needing to reach out to us (: . This documentation consists of:

1. Tutorials - Showing exactly step-by-step how to integrate a technology.
2. Manuals - Explaining in detail the functionality of technology, and its connection and cooperation with other technology.
3. Public API Reference - Allows for easy lookup of methods being used during implementation giving a little bit more context.\
4. Information / Requirements - communicates what are the requirements to use tools, like required Unity versions etc.

## User manual

This kind of documentation is addressed to end-users that don’t have to integrate the technology, they have to operate it. This documentation consist of mostly tutorials and examples answering a question “how to use/add/delete” rather than “why”.

## Prioritization

| Kind of documentation | Category / Audience | Usage | Cost of maintenance | Impact of outdated info | Creators |
| --- | --- | --- | --- | --- | --- |
| Guidelines | Internal Dev | 🟡 Medium | 🔵 Low | 🔵 Low | Arch / Lead |
| ADRs | Internal Dev | 🔵 Low | 🔵 Low | 🔵 Low | Arch / Lead |
| HLD/SDD | Internal Dev | 🟡 Medium | 🟡 Medium | 🟡 Medium | Devs |
| Internal API Ref | Internal Dev | 🔵 Low | 🔵 Low | 🔵 Low | Devs |
| Tutorials | Developer - Ext | 🔴 Very High | 🟠 High | 🟠 High | Devs |
| Manuals | Developer - Ext | 🟡 Medium | 🟡 Medium | 🟠 High | Devs |
| Public Api Ref | Developer - Ext | 🔵 Low | 🟡 Medium | 🔵 Low | Devs |
| Requirements | Developer - Ext | 🔵 Low | 🟡 Medium | 🟠 High | Arch / Lead / Devs |
| User manual | User - Ext / Int | 🟠 High | 🟡 Medium |  🟠 High | Devs / Products |

The prioritization context reveals a lot about where the needs are located, and should be a pointer to the priority of delivering each kind of documentation.

## Delivery of documentation

Documentation for various audiences has different requirements for capabilities:

Internal docs require:

- Only accessible via SSO
- Version history is not required

External developer docs:

- Most documentation available publicly
- Documentation version should match the SDK version developer is using
- Documentation of (some) modules that are not available for developer is hidden
- Documentation can reference API w/o reliance on permalinks

User documentation

- Available publicly
- Ease of creation (like WYSIWYG editor)

This most likely points into the need of having different tools to deliver different kinds of documentation, which at the end needs to be presented in a form of a webpage. This requirement of publishing as a website also has a gradation - while internal documentation can be accessed via internal platforms (like Notion) the User manual most likely too, as published materials (using notion, confluence, hubspot etc.) , the external developer documentation poses extra challenges with authentication, page composition or versioning, requiring more sophisticated deployment,.

## Opinion

*This is just personal opinion*

For SDK/Mobile team, focus should go from tutorials, to manuals, with any API reference only used as a supplement when writing both (can also be added retroactively).

It must be also understood, that any documentation developed at first will have to be re-written after some time from first iteration because:

- The knowledge of how to write will increase
- Technical capabilities of the docs tool will increase
- SDK API will change.

The most value will be created by starting to push out better quality docs out now. API reference is at lower priority.

### Software rating

1. docFx - great for **external developer documentation** - can be integrated with pulling out docs from repositories, although GitHub won’t render many macros that docFX is using.
Meanwhile it is overcomplicated for developer documentation, or for the user docs.
Additionally its customization options (like embedding within another page) are lacking a bit, with only limited header and footer customization, would require custom tooling to embed within space like [Docusaurus](https://docusaurus.io/).
2. GitBook - Because of the powerful editor, its a great tool for **User Documentation** - because of the rich editor and publication tools. On par with Confluence or Notion, with the only caveat being its extensibility by custom plugins.
However, all tools like GitBook or Notion fall short for providing good developer documentation, because of their poor integration with (non-web) API reference, which would require extra development.
3. Notion - Because Homa uses Notion internally already, Notion is the best place to build **internal developer documentation**. As its the kind of documentation with the lowest level of requirements, and Notion is already a day-to-day tool, it can be used for that purpose, especially that we would like to have them private.
4. [Doxygen](https://www.doxygen.nl/) - is great for mixed language documentation and provides best extensibility at the cost of lesser amount of features out of the box, hefty maintenance load, and necessity to implement many out-of the box features.

### On versioning…

It’s important to keep in mind, that with all of those tools providing documentation for specific (current and previous) versions of modules will require extra tooling anyways. That means that the focus should be on providing the best docs for the currently newest version, and focus on versioning in later time.