import { useState, useEffect } from 'react';
import { Plus, Trash2, Clock, StickyNote, Save } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  createdAt: string;
  chapterId: string;
}

interface NoteAppProps {
  chapterId?: string;
}

export default function NoteApp({ chapterId }: NoteAppProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Load notes from local storage
  useEffect(() => {
    const savedNotes = localStorage.getItem('user_notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('user_notes', JSON.stringify(notes));
  }, [notes]);

  const handleSaveNote = () => {
    if (!currentNote.trim() || !chapterId) return;

    const newNote: Note = {
      id: crypto.randomUUID(),
      content: currentNote,
      createdAt: new Date().toISOString(),
      chapterId,
    };

    setNotes([newNote, ...notes]);
    setCurrentNote('');
    setIsFocused(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const filteredNotes = chapterId 
    ? notes.filter(n => n.chapterId === chapterId)
    : notes;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Note Input */}
      <div 
        className={`bg-white dark:bg-dark-100 rounded-2xl border transition-all duration-300 mb-8 ${
          isFocused ? 'border-primary-300 ring-4 ring-primary-50 dark:ring-primary-900/30 shadow-lg' : 'border-dark-100 dark:border-dark-100/50 shadow-sm'
        }`}
      >
        <div className="p-4">
          <textarea
            placeholder="Write your note here..."
            value={currentNote}
            onChange={(e) => setCurrentNote(e.target.value)}
            onFocus={() => setIsFocused(true)}
            className="w-full min-h-[120px] resize-none outline-none text-dark-800 placeholder:text-dark-400 text-sm leading-relaxed bg-transparent"
          />
        </div>
        
        {isFocused && (
          <div className="px-4 py-3 bg-dark-50 dark:bg-dark-50/50 border-t border-dark-100 dark:border-dark-100/50 flex justify-between items-center rounded-b-2xl animate-in fade-in slide-in-from-top-2">
            <span className="text-xs text-dark-400 font-medium">
              Formatting coming soon
            </span>
            <div className="flex gap-2">
               <button 
                 onClick={() => setIsFocused(false)}
                 className="px-4 py-1.5 text-xs font-medium text-dark-500 hover:bg-dark-200 dark:hover:bg-dark-200/50 rounded-lg transition-colors"
               >
                 Cancel
               </button>
               <button 
                 onClick={handleSaveNote}
                 className="px-4 py-1.5 text-xs font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-1.5 shadow-md"
               >
                 <Save size={14} />
                 Save Note
               </button>
            </div>
          </div>
        )}
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-dark-400 uppercase tracking-widest px-1 mb-4 flex items-center gap-2">
          <StickyNote size={14} />
          Your Notes ({filteredNotes.length})
        </h3>

        {filteredNotes.length === 0 ? (
          <div className="text-center py-12 bg-dark-50 dark:bg-dark-100 rounded-2xl border border-dashed border-dark-200 dark:border-dark-100/50">
            <div className="w-12 h-12 bg-white dark:bg-dark-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-dark-300 dark:text-dark-500">
               <Plus size={24} />
            </div>
            <p className="text-dark-500 font-medium text-sm">No notes yet</p>
            <p className="text-dark-400 text-xs mt-1">Start typing above to add a note for this chapter</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div key={note.id} className="bg-white dark:bg-dark-100 p-5 rounded-2xl border border-dark-100 dark:border-dark-100/50 hover:border-dark-200 dark:hover:border-dark-100 transition-all group shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 text-xs text-dark-400">
                  <Clock size={12} />
                  {new Date(note.createdAt).toLocaleDateString()} • {new Date(note.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
                <button 
                  onClick={() => handleDeleteNote(note.id)}
                  className="text-dark-300 hover:text-error transition-colors p-1 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <p className="text-dark-700 text-sm whitespace-pre-wrap leading-relaxed">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
