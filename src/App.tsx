import { useMemo, useState } from 'react';
import { Search, BookOpen, FileText, GraduationCap, Clock3, ArrowUpRight, Bookmark, ChevronDown, SlidersHorizontal, Sparkles, Menu, X, CheckCircle2, LibraryBig } from 'lucide-react';
import { resources, type Resource } from './studyData';
const types = ['All resources', 'Chapter practice', 'Sample papers'];
const subjects = ['All subjects', 'Mathematics', 'Science', 'English', 'Social Science', 'Physics', 'Chemistry', 'Biology', 'Accountancy'];

function App() {
  const [grade, setGrade] = useState('Class 10');
  const [activeType, setActiveType] = useState('All resources');
  const [subject, setSubject] = useState('All subjects');
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useState<string[]>([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeNav, setActiveNav] = useState('Explore');
  const [openedResource, setOpenedResource] = useState<Resource | null>(null);
  const [revealed, setRevealed] = useState<number[]>([]);

  const filtered = useMemo(() => resources.filter(item => {
    const matchGrade = item.grade === grade;
    const matchType = activeType === 'All resources' || item.type.toLowerCase().includes(activeType.replace(/s$/, '').toLowerCase());
    const matchSubject = subject === 'All subjects' || item.subject === subject;
    const searchable = `${item.title} ${item.subject} ${item.type} ${item.detail} ${item.questions.map(q => q.prompt).join(' ')}`;
    const matchQuery = searchable.toLowerCase().includes(query.toLowerCase());
    return matchGrade && matchType && matchSubject && matchQuery;
  }), [grade, activeType, subject, query]);

  const visibleResources = activeNav === 'My library' ? filtered.filter(r => saved.includes(r.title)) : filtered;
  const toggleSaved = (title: string) => setSaved(current => current.includes(title) ? current.filter(x => x !== title) : [...current, title]);

  return <div className="app-shell">
    <aside className={`sidebar ${showMenu ? 'sidebar-open' : ''}`}>
      <div className="brand"><div className="brand-mark"><LibraryBig size={21}/></div><span>Board<span className="brand-accent">wise</span></span><button className="close-menu" onClick={() => setShowMenu(false)}><X size={19}/></button></div>
      <div className="side-label">STUDY SPACE</div>
      <nav className="side-nav">{[['Explore', Search], ['My library', Bookmark], ['Study planner', Clock3]].map(([name, Icon]: any) => <button key={name} onClick={() => { setActiveNav(name); setShowMenu(false); }} className={`nav-item ${activeNav === name ? 'nav-active' : ''}`}><Icon size={18}/><span>{name}</span>{name === 'My library' && saved.length > 0 && <span className="nav-count">{saved.length}</span>}</button>)}</nav>
      <div className="sidebar-card"><div className="sidebar-card-icon"><Sparkles size={16}/></div><b>Make every study hour count.</b><p>Small steps today, big results on exam day.</p><button onClick={() => { setActiveNav('Study planner'); }}>Explore study tips <ArrowUpRight size={14}/></button></div>
      <div className="sidebar-bottom"><div className="avatar">S</div><div><b>Student workspace</b><span>CBSE · {grade}</span></div><ChevronDown size={16}/></div>
    </aside>
    {showMenu && <button className="menu-scrim" onClick={() => setShowMenu(false)} aria-label="Close menu"/>}
    <main className="main-area">
      <header className="topbar"><button className="mobile-menu" onClick={() => setShowMenu(true)} aria-label="Open menu"><Menu size={21}/></button><div className="crumb">Study space <span>/</span> <b>{activeNav}</b></div><div className="topbar-right"><span className="live-dot"/> <span>Ready when you are</span><div className="top-avatar">S</div></div></header>
      <div className="page-wrap">
        <section className="welcome-row"><div><div className="eyebrow"><span className="eyebrow-line"/> YOUR CBSE STUDY COMPANION</div><h1>Study smarter.<br/><span>Show what you know.</span></h1><p className="intro">The right practice, at the right time. Find papers, chapter questions and revision material for your board exams.</p><div className="trust-line"><CheckCircle2 size={16}/> Curated for CBSE learners <span>·</span> Built for focused practice</div></div><div className="hero-art" aria-hidden="true"><div className="art-circle circle-back"/><div className="art-circle circle-front"/><div className="art-sheet"><div className="sheet-top"><span/><span/><span/></div><div className="sheet-title"/><div className="sheet-line long"/><div className="sheet-line"/><div className="sheet-check"><CheckCircle2 size={23}/></div><div className="sheet-lines"><i/><i/><i/></div></div><div className="art-star star-one">✦</div><div className="art-star star-two">✳</div><div className="art-caption">Your next<br/>breakthrough.</div></div></section>
        <section className="search-panel"><div className="searchbox"><Search size={19}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search subjects, chapters or papers..."/><kbd>⌘ K</kbd></div><div className="grade-select"><GraduationCap size={18}/><select value={grade} onChange={e => setGrade(e.target.value)} aria-label="Select class"><option>Class 10</option><option>Class 12</option></select><ChevronDown size={15}/></div></section>
        <section className="stats-row"><div className="stat"><div className="stat-icon stat-blue"><FileText size={19}/></div><div><b>Board-ready practice</b><span>Sample papers & PYQs</span></div></div><div className="stat"><div className="stat-icon stat-green"><BookOpen size={19}/></div><div><b>Chapter by chapter</b><span>Learn at your own pace</span></div></div><div className="stat"><div className="stat-icon stat-purple"><Sparkles size={19}/></div><div><b>Better preparation</b><span>Practice with purpose</span></div></div></section>
        <section className="resources-section"><div className="section-heading"><div><div className="section-kicker">PICK UP WHERE YOU NEED</div><h2>{activeNav === 'My library' ? 'Your saved resources' : activeNav === 'Study planner' ? 'A little guidance goes a long way' : 'Find your next practice set'}</h2><p>Focused resources for {grade}, all in one place.</p></div><button className="filter-button" onClick={() => setShowFilters(!showFilters)}><SlidersHorizontal size={16}/> Filters <span className="filter-chevron">{showFilters ? '−' : '+'}</span></button></div>
          <div className="filter-bar">{types.map(type => <button key={type} onClick={() => setActiveType(type)} className={`filter-chip ${activeType === type ? 'chip-active' : ''}`}>{type}</button>)}<div className="subject-wrap"><select aria-label="Filter by subject" value={subject} onChange={e => setSubject(e.target.value)}>{subjects.map(s => <option key={s}>{s}</option>)}</select><ChevronDown size={14}/></div></div>
          {showFilters && <div className="extra-filter"><span>SUBJECT</span><div>{subjects.slice(1).map(s => <button key={s} className={`subject-chip ${subject === s ? 'selected-subject' : ''}`} onClick={() => setSubject(subject === s ? 'All subjects' : s)}>{s}</button>)}</div></div>}
          <div className="resource-grid">{visibleResources.map((item, i) => <article className="resource-card" key={item.title} style={{ animationDelay: `${i * 55}ms` }}><div className="card-top"><div className={`resource-icon ${item.color}`}><FileText size={20}/></div><button aria-label={saved.includes(item.title) ? 'Remove bookmark' : 'Save resource'} className={`bookmark ${saved.includes(item.title) ? 'is-saved' : ''}`} onClick={() => toggleSaved(item.title)}><Bookmark size={18} fill={saved.includes(item.title) ? 'currentColor' : 'none'}/></button></div><div className="card-tags"><span className={`tag tag-${item.color}`}>{item.tag}</span><span className="resource-year">{item.year}</span></div><h3>{item.title}</h3><p>{item.detail}</p><div className="card-bottom"><span><BookOpen size={14}/>{item.subject}</span><button aria-label={`Open ${item.title}`} onClick={() => { setOpenedResource(item); setRevealed([]); }}>Open practice <ArrowUpRight size={15}/></button></div></article>)}</div>
          {visibleResources.length === 0 && <div className="empty-state"><div><Search size={23}/></div><h3>No resources found just yet</h3><p>Try another class, subject or search. We're adding more study material all the time.</p><button onClick={() => {setQuery('');setSubject('All subjects');setActiveType('All resources');}}>Clear filters</button></div>}
          <div className="official-note"><div className="note-icon"><CheckCircle2 size={17}/></div><p><b>Need official sample papers or past papers?</b><br/>Our chapter drills and mini papers are original practice—not copied CBSE papers. Use CBSE’s academic site for official sample papers, marking schemes and curriculum notices.</p><a href="https://www.cbseacademic.nic.in/" target="_blank" rel="noreferrer">Open CBSE Academic <ArrowUpRight size={14}/></a></div>
        </section>
        <footer className="footer"><span>Made for the moments you decide to keep going.</span><span>Independent learning companion · Not affiliated with CBSE</span></footer>
      </div>
    </main>
    {openedResource && <div className="modal-backdrop" role="presentation" onClick={() => setOpenedResource(null)}><section className="practice-modal" role="dialog" aria-modal="true" aria-labelledby="practice-title" onClick={event => event.stopPropagation()}><div className="modal-header"><div><span className="section-kicker">{openedResource.grade} · {openedResource.subject} · ORIGINAL PRACTICE</span><h2 id="practice-title">{openedResource.title}</h2><p>Try each question first, then reveal the worked answer.</p></div><button className="modal-close" aria-label="Close practice" onClick={() => setOpenedResource(null)}><X size={20}/></button></div><div className="question-list">{openedResource.questions.map((question, index) => <article className="question-item" key={question.prompt}><div className="question-number">{String(index + 1).padStart(2, '0')}</div><div className="question-body"><h3>{question.prompt}</h3>{revealed.includes(index) ? <div className="answer-box"><b>Answer: {question.answer}</b><p>{question.explanation}</p></div> : <button className="reveal-answer" onClick={() => setRevealed(current => [...current, index])}>Show worked answer <ArrowUpRight size={14}/></button>}</div></article>)}</div><div className="modal-footer"><span><CheckCircle2 size={15}/> Original learning material · Not an official CBSE paper</span><button onClick={() => setOpenedResource(null)}>Done for now</button></div></section></div>}
  </div>;
}
export default App;
