const {useState,useEffect,useRef,useCallback,createContext,useContext}=React;

// ─── CRYPTO ──────────────────────────────────────────────────────────────────
const hashPwd=(pwd)=>{let h=0;for(let i=0;i<pwd.length;i++){h=((h<<5)-h)+pwd.charCodeAt(i);h|=0}return'hash_'+Math.abs(h).toString(16)};

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
const INITIAL_STATE={
  darkMode:false,
  currentUser:null,
  currentPage:'login',
  users:[
    {id:'u1',username:'admin',password:hashPwd('adminjagoan'),role:'admin',name:'Administrator'},
    {id:'u2',username:'siswa2026',password:hashPwd('siswabi2026'),role:'siswa',name:'Portal Siswa'}
  ],
  siswa:[
    {id:'s1',nis:'2024001',nama:'Andi Firmansyah',kelas:'X-A',jenisKelamin:'L',tempatLahir:'Surabaya',tanggalLahir:'2008-03-15',alamat:'Jl. Raya No.10',noHP:'081234567890',foto:''},
    {id:'s2',nis:'2024002',nama:'Bunga Citra Dewi',kelas:'X-A',jenisKelamin:'P',tempatLahir:'Malang',tanggalLahir:'2008-07-22',alamat:'Jl. Mawar No.5',noHP:'081234567891',foto:''},
    {id:'s3',nis:'2024003',nama:'Cahyo Nugroho',kelas:'X-B',jenisKelamin:'L',tempatLahir:'Sidoarjo',tanggalLahir:'2008-01-10',alamat:'Jl. Kenanga No.3',noHP:'081234567892',foto:''},
    {id:'s4',nis:'2024004',nama:'Dian Pertiwi',kelas:'X-B',jenisKelamin:'P',tempatLahir:'Surabaya',tanggalLahir:'2008-09-05',alamat:'Jl. Melati No.7',noHP:'081234567893',foto:''},
    {id:'s5',nis:'2024005',nama:'Eko Prasetyo',kelas:'XI-A',jenisKelamin:'L',tempatLahir:'Gresik',tanggalLahir:'2007-04-18',alamat:'Jl. Dahlia No.2',noHP:'081234567894',foto:''},
  ],
  guru:[
    {id:'g1',nip:'GP001',nama:'Dr. Ahmad Rizal',mapel:'Matematika',pendidikan:'S2',noHP:'082234567890'},
    {id:'g2',nip:'GP002',nama:'Siti Rahayu, S.Pd',mapel:'Bahasa Indonesia',pendidikan:'S1',noHP:'082234567891'},
    {id:'g3',nip:'GP003',nama:'Budi Santoso, S.T',mapel:'IPA',pendidikan:'S1',noHP:'082234567892'},
    {id:'g4',nip:'GP004',nama:'Rina Wulandari, S.Pd',mapel:'Bahasa Inggris',pendidikan:'S1',noHP:'082234567893'},
    {id:'g5',nip:'GP005',nama:'Hendra Kusuma, S.Sos',mapel:'IPS',pendidikan:'S1',noHP:'082234567894'},
  ],
  kelas:[
    {id:'k1',nama:'X-A',tingkat:'X',waliKelas:'Dr. Ahmad Rizal',tahunAjaran:'2024/2025',kapasitas:30},
    {id:'k2',nama:'X-B',tingkat:'X',waliKelas:'Siti Rahayu, S.Pd',tahunAjaran:'2024/2025',kapasitas:30},
    {id:'k3',nama:'XI-A',tingkat:'XI',waliKelas:'Budi Santoso, S.T',tahunAjaran:'2024/2025',kapasitas:28},
  ],
  mapel:[
    {id:'m1',kode:'MAT',nama:'Matematika',guru:'Dr. Ahmad Rizal',kelas:'X-A',kkm:70,bobot:{harian:40,pas:30,pat:30}},
    {id:'m2',kode:'BIN',nama:'Bahasa Indonesia',guru:'Siti Rahayu, S.Pd',kelas:'X-A',kkm:75,bobot:{harian:40,pas:30,pat:30}},
    {id:'m3',kode:'IPA',nama:'IPA',guru:'Budi Santoso, S.T',kelas:'X-A',kkm:70,bobot:{harian:40,pas:30,pat:30}},
    {id:'m4',kode:'BIG',nama:'Bahasa Inggris',guru:'Rina Wulandari, S.Pd',kelas:'X-A',kkm:70,bobot:{harian:40,pas:30,pat:30}},
    {id:'m5',kode:'IPS',nama:'IPS',guru:'Hendra Kusuma, S.Sos',kelas:'X-A',kkm:68,bobot:{harian:40,pas:30,pat:30}},
    {id:'m6',kode:'MAT',nama:'Matematika',guru:'Dr. Ahmad Rizal',kelas:'X-B',kkm:70,bobot:{harian:40,pas:30,pat:30}},
    {id:'m7',kode:'BIN',nama:'Bahasa Indonesia',guru:'Siti Rahayu, S.Pd',kelas:'X-B',kkm:75,bobot:{harian:40,pas:30,pat:30}},
  ],
  nilai:[
    {id:'n1',siswaId:'s1',mapelId:'m1',semester:'1',nilaiHarian:[85,90,78,92,88],nilaiPAS:84,nilaiPAT:86,catatan:''},
    {id:'n2',siswaId:'s1',mapelId:'m2',semester:'1',nilaiHarian:[80,85,90,75,88],nilaiPAS:82,nilaiPAT:85,catatan:''},
    {id:'n3',siswaId:'s1',mapelId:'m3',semester:'1',nilaiHarian:[75,80,85,78,82],nilaiPAS:78,nilaiPAT:80,catatan:''},
    {id:'n4',siswaId:'s1',mapelId:'m4',semester:'1',nilaiHarian:[90,88,85,92,87],nilaiPAS:88,nilaiPAT:90,catatan:''},
    {id:'n5',siswaId:'s1',mapelId:'m5',semester:'1',nilaiHarian:[78,82,80,85,79],nilaiPAS:80,nilaiPAT:82,catatan:''},
    {id:'n6',siswaId:'s2',mapelId:'m1',semester:'1',nilaiHarian:[92,88,95,90,94],nilaiPAS:90,nilaiPAT:93,catatan:''},
    {id:'n7',siswaId:'s2',mapelId:'m2',semester:'1',nilaiHarian:[88,85,90,87,92],nilaiPAS:86,nilaiPAT:88,catatan:''},
    {id:'n8',siswaId:'s2',mapelId:'m3',semester:'1',nilaiHarian:[85,88,82,90,86],nilaiPAS:84,nilaiPAT:87,catatan:''},
    {id:'n9',siswaId:'s3',mapelId:'m6',semester:'1',nilaiHarian:[70,72,75,68,74],nilaiPAS:71,nilaiPAT:73,catatan:''},
    {id:'n10',siswaId:'s4',mapelId:'m6',semester:'1',nilaiHarian:[88,85,90,82,87],nilaiPAS:86,nilaiPAT:88,catatan:''},
  ],
  absensi:[
    {id:'a1',siswaId:'s1',semester:'1',hadir:85,izin:3,sakit:2,alpa:0},
    {id:'a2',siswaId:'s2',semester:'1',hadir:88,izin:1,sakit:1,alpa:0},
    {id:'a3',siswaId:'s3',semester:'1',hadir:82,izin:4,sakit:2,alpa:2},
    {id:'a4',siswaId:'s4',semester:'1',hadir:87,izin:2,sakit:1,alpa:0},
    {id:'a5',siswaId:'s5',semester:'1',hadir:89,izin:1,sakit:0,alpa:0},
  ],
  sikap:[
    {id:'sk1',siswaId:'s1',semester:'1',spiritual:'Baik',sosial:'Sangat Baik',catatan:'Andi adalah siswa yang aktif dan bersemangat dalam belajar. Menunjukkan perkembangan positif.'},
    {id:'sk2',siswaId:'s2',semester:'1',spiritual:'Sangat Baik',sosial:'Sangat Baik',catatan:'Bunga adalah siswa berprestasi yang rajin dan disiplin. Sangat direkomendasikan untuk kompetisi.'},
    {id:'sk3',siswaId:'s3',semester:'1',spiritual:'Cukup',sosial:'Baik',catatan:'Cahyo perlu meningkatkan kehadirannya. Potensi akademik masih bisa berkembang lebih baik.'},
  ],
  semester:[
    {id:'sm1',nama:'Semester 1',tahunAjaran:'2024/2025',mulai:'2024-07-15',selesai:'2024-12-20',aktif:true},
    {id:'sm2',nama:'Semester 2',tahunAjaran:'2024/2025',mulai:'2025-01-06',selesai:'2025-06-20',aktif:false},
  ],
  pengumuman:[
    {id:'p1',judul:'Pengumuman Ujian Semester',isi:'Ujian Akhir Semester akan dilaksanakan pada tanggal 15-20 Desember 2024.',tanggal:'2024-12-01',penting:true},
    {id:'p2',judul:'Libur Hari Raya',isi:'Seluruh kegiatan belajar diliburkan pada tanggal 25 Desember 2024.',tanggal:'2024-12-10',penting:false},
    {id:'p3',judul:'Rapor Online Tersedia',isi:'Rapor semester 1 dapat diakses mulai 25 Desember 2024 melalui portal siswa.',tanggal:'2024-12-20',penting:true},
  ],
  selectedSiswaId:null,
  searchQuery:'',
  filterKelas:'semua',
  activeSemester:'1',
  toasts:[],
  nilaiHistory:[],
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const avg=(arr)=>arr.length?Math.round(arr.reduce((a,b)=>a+b,0)/arr.length):0;
const nilaiAkhir=(nilaiObj,bobot)=>{
  const rataHarian=avg(nilaiObj.nilaiHarian||[]);
  return Math.round((rataHarian*(bobot.harian/100))+(nilaiObj.nilaiPAS*(bobot.pas/100))+(nilaiObj.nilaiPAT*(bobot.pat/100)));
};
const predikat=(nilai)=>{
  if(nilai>=90)return{huruf:'A',desc:'Sangat Baik',cls:'predikat-a'};
  if(nilai>=80)return{huruf:'B',desc:'Baik',cls:'predikat-b'};
  if(nilai>=70)return{huruf:'C',desc:'Cukup',cls:'predikat-c'};
  return{huruf:'D',desc:'Kurang',cls:'predikat-d'};
};
const autoDesc=(mapelNama,nilai,nama)=>{
  const p=predikat(nilai);
  const descs={
    'A':[`${nama} menunjukkan pemahaman yang sangat baik dalam ${mapelNama}.`,`Penguasaan materi ${mapelNama} sangat memuaskan dan konsisten.`],
    'B':[`${nama} memiliki pemahaman yang baik dalam ${mapelNama}.`,`Kemampuan ${nama} dalam ${mapelNama} sudah baik dan perlu dipertahankan.`],
    'C':[`${nama} cukup memahami materi ${mapelNama}, namun perlu ditingkatkan.`,`Pemahaman ${nama} dalam ${mapelNama} masih perlu bimbingan lebih lanjut.`],
    'D':[`${nama} perlu lebih banyak latihan dan perhatian dalam ${mapelNama}.`,`Diharapkan ${nama} lebih giat belajar ${mapelNama} di semester berikutnya.`],
  };
  const arr=descs[p.huruf];
  return arr[Math.floor(Math.random()*arr.length)];
};
const rankingSiswa=(siswaList,nilaiList,mapelList,semester)=>{
  return siswaList.map(s=>{
    const nilaiSiswa=nilaiList.filter(n=>n.siswaId===s.id&&n.semester===semester);
    const total=nilaiSiswa.reduce((sum,n)=>{
      const m=mapelList.find(mp=>mp.id===n.mapelId);
      if(!m)return sum;
      return sum+nilaiAkhir(n,m.bobot);
    },0);
    const rata=nilaiSiswa.length?Math.round(total/nilaiSiswa.length):0;
    return{...s,rataRata:rata,jumlahMapel:nilaiSiswa.length};
  }).sort((a,b)=>b.rataRata-a.rataRata).map((s,i)=>({...s,ranking:i+1}));
};

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Icon=({name,size=18,style={}})=>{
  const icons={
    home:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    users:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    book:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
    chart:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
    edit:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
    trash:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
    plus:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    download:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    print:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
    star:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    menu:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    sun:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    moon:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    logout:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
    check:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    x:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    search:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    bell:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    settings:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    calendar:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    file:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
    shield:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    qr:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><path d="M14 14h3v3h-3z"/><path d="M17 17h4"/><path d="M17 21v-3"/><path d="M21 14v3"/></svg>,
    upload:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
    award:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
    info:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
  };
  return<span style={{display:'inline-flex',alignItems:'center',...style}}>{icons[name]||<svg width={size} height={size}/>}</span>;
};

// ─── TOAST ────────────────────────────────────────────────────────────────────
const ToastContainer=({toasts,onRemove})=>(
  <div className="toast-container">
    {toasts.map(t=>(
      <div key={t.id} className={`toast toast-${t.type}`} onClick={()=>onRemove(t.id)}>
        <Icon name={t.type==='success'?'check':t.type==='error'?'x':'info'} size={16}/>
        <span>{t.message}</span>
      </div>
    ))}
  </div>
);

// ─── LOGIN PAGE ───────────────────────────────────────────────────────────────
const LoginPage=({onLogin})=>{
  const[id,setId]=useState('');
  const[pwd,setPwd]=useState('');
  const[err,setErr]=useState('');
  const[showPwd,setShowPwd]=useState(false);
  const handleLogin=()=>{
    const found=INITIAL_STATE.users.find(u=>u.username===id&&u.password===hashPwd(pwd));
    if(found){onLogin(found)}
    else setErr('ID atau password salah. Coba lagi.');
  };
  return(
    <div className="login-page">
      <div className="login-deco login-deco1"/>
      <div className="login-deco login-deco2"/>
      <div className="login-card">
        <div className="login-logo">
          <img src="https://i.ibb.co.com/27yRSD51/Logo-Brilliant-Set.png" onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex'}} alt="Brilliant Institute"/>
          <div style={{display:'none',width:64,height:64,borderRadius:'50%',background:'#1a56db',color:'#fff',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:800,margin:'0 auto'}}>BI</div>
        </div>
        <div className="login-title">
          <h1>Brilliant Institute</h1>
          <p>Centre of Knowledge</p>
          <h2>Laporan Hasil Belajar Siswa</h2>
        </div>
        <div className="form-group">
          <label className="form-label">ID Pengguna</label>
          <input className="form-input" placeholder="Masukkan ID" value={id} onChange={e=>setId(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()}/>
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <div style={{position:'relative'}}>
            <input className="form-input" type={showPwd?'text':'password'} placeholder="Masukkan password" value={pwd} onChange={e=>setPwd(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} style={{paddingRight:40}}/>
            <button onClick={()=>setShowPwd(!showPwd)} style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'#94a3b8',fontSize:13}}>{showPwd?'🙈':'👁'}</button>
          </div>
        </div>
        {err&&<div style={{color:'#dc2626',fontSize:13,marginBottom:12,padding:'8px 12px',background:'#fee2e2',borderRadius:8}}>{err}</div>}
        <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'12px',fontSize:15}} onClick={handleLogin}>
          Masuk <Icon name="logout" size={16}/>
        </button>
        <div style={{marginTop:20,padding:12,background:'#f0f4ff',borderRadius:8,fontSize:12,color:'#475569'}}>
          <strong style={{display:'block',marginBottom:4,color:'#1a56db'}}>Info Login Demo:</strong>
          Admin: admin / adminjagoan<br/>
          Siswa: siswa2026 / siswabi2026
        </div>
      </div>
    </div>
  );
};

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const App=()=>{
  const[state,setState]=useState(()=>{
    try{const s=localStorage.getItem('brilliantState');return s?{...INITIAL_STATE,...JSON.parse(s)}:INITIAL_STATE}catch{return INITIAL_STATE}
  });
  const[sidebarOpen,setSidebarOpen]=useState(true);
  const[modal,setModal]=useState(null);
  const[activeTab,setActiveTab]=useState('');
  const toastIdRef=useRef(0);

  const update=(patch)=>setState(prev=>{const next={...prev,...patch};try{localStorage.setItem('brilliantState',JSON.stringify(next))}catch{}return next});

  const toast=(message,type='info')=>{
    const id=++toastIdRef.current;
    setState(prev=>({...prev,toasts:[...prev.toasts,{id,message,type}]}));
    setTimeout(()=>setState(prev=>({...prev,toasts:prev.toasts.filter(t=>t.id!==id)})),3500);
  };

  const removeToast=(id)=>setState(prev=>({...prev,toasts:prev.toasts.filter(t=>t.id!==id)}));

  const login=(user)=>{update({currentUser:user,currentPage:user.role==='admin'?'dashboard':'siswa-dashboard'});toast(`Selamat datang, ${user.name}!`,'success')};
  const logout=()=>{update({currentUser:null,currentPage:'login'});toast('Berhasil keluar','info')};

  useEffect(()=>{document.body.className=state.darkMode?'dark':''},[state.darkMode]);

  if(!state.currentUser)return<><LoginPage onLogin={login}/><ToastContainer toasts={state.toasts} onRemove={removeToast}/></>;

  const isAdmin=state.currentUser.role==='admin';
  const pages=isAdmin?adminPages:siswaPages;

  return(
    <div className="app-layout">
      <ToastContainer toasts={state.toasts} onRemove={removeToast}/>
      {modal&&<ModalRenderer modal={modal} setModal={setModal} state={state} update={update} toast={toast}/>}
      
      {/* SIDEBAR */}
      <aside className={`sidebar ${!sidebarOpen?'sidebar-collapsed':''}`}>
        <div className="sidebar-brand">
          <img src="https://i.ibb.co.com/27yRSD51/Logo-Brilliant-Set.png" onError={e=>{e.target.style.display='none'}} alt="BI" style={{borderRadius:8}}/>
          {sidebarOpen&&<div className="brand-text"><h3>Brilliant</h3><p>Institute</p></div>}
        </div>
        <nav className="sidebar-nav">
          {pages.map(section=>(
            <div className="nav-section" key={section.label}>
              {sidebarOpen&&<span className="nav-section-label">{section.label}</span>}
              {section.items.map(item=>(
                <button key={item.id} className={`nav-item ${state.currentPage===item.id?'active':''}`} onClick={()=>update({currentPage:item.id,searchQuery:''})}>
                  <Icon name={item.icon} size={18}/>
                  {sidebarOpen&&<span>{item.label}</span>}
                  {sidebarOpen&&item.badge&&<span className="nav-badge">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="nav-item" onClick={logout}><Icon name="logout" size={18}/>{sidebarOpen&&<span>Keluar</span>}</button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="main-content">
        <header className="topbar">
          <button className="btn-icon" onClick={()=>setSidebarOpen(!sidebarOpen)}><Icon name="menu"/></button>
          <div style={{flex:1,display:'flex',alignItems:'center',gap:8}}>
            <span style={{fontSize:13,color:'var(--text3)'}}>Brilliant Institute</span>
            <span style={{color:'var(--text3)'}}>›</span>
            <span style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>{pages.flatMap(s=>s.items).find(i=>i.id===state.currentPage)?.label||'Dashboard'}</span>
          </div>
          <div style={{position:'relative'}}>
            <Icon name="search" size={16} style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',color:'var(--text3)'}}/>
            <input className="form-input" placeholder="Cari siswa..." style={{paddingLeft:34,width:200,fontSize:13,height:36}} value={state.searchQuery} onChange={e=>update({searchQuery:e.target.value})}/>
          </div>
          <button className="btn-icon" onClick={()=>update({darkMode:!state.darkMode})} data-tooltip={state.darkMode?'Light mode':'Dark mode'}>
            <Icon name={state.darkMode?'sun':'moon'}/>
          </button>
          <div style={{display:'flex',alignItems:'center',gap:8}}>
            <div className="avatar">{state.currentUser.name.slice(0,2).toUpperCase()}</div>
            {sidebarOpen&&<div style={{fontSize:12}}><div style={{fontWeight:600,color:'var(--text)'}}>{state.currentUser.name}</div><div style={{color:'var(--text3)',textTransform:'capitalize'}}>{state.currentUser.role}</div></div>}
          </div>
        </header>

        <main className="page-body">
          <PageRenderer page={state.currentPage} state={state} update={update} toast={toast} setModal={setModal}/>
        </main>
      </div>
    </div>
  );
};

// ─── NAV CONFIG ───────────────────────────────────────────────────────────────
const adminPages=[
  {label:'Utama',items:[
    {id:'dashboard',label:'Dashboard',icon:'home'},
    {id:'pengumuman',label:'Pengumuman',icon:'bell',badge:'3'},
  ]},
  {label:'Data Master',items:[
    {id:'data-siswa',label:'Data Siswa',icon:'users'},
    {id:'data-guru',label:'Data Guru',icon:'book'},
    {id:'data-kelas',label:'Kelas & Mapel',icon:'calendar'},
    {id:'data-semester',label:'Semester',icon:'settings'},
  ]},
  {label:'Akademik',items:[
    {id:'input-nilai',label:'Input Nilai',icon:'edit'},
    {id:'input-absensi',label:'Input Absensi',icon:'check'},
    {id:'input-sikap',label:'Sikap & Catatan',icon:'file'},
  ]},
  {label:'Laporan',items:[
    {id:'rapor-preview',label:'Preview Rapor',icon:'print'},
    {id:'ranking',label:'Ranking Siswa',icon:'award'},
    {id:'statistik',label:'Statistik',icon:'chart'},
  ]},
  {label:'Sistem',items:[
    {id:'kelola-akun',label:'Kelola Akun',icon:'shield'},
    {id:'backup',label:'Backup Data',icon:'download'},
  ]},
];
const siswaPages=[
  {label:'Siswa',items:[
    {id:'siswa-dashboard',label:'Dashboard',icon:'home'},
    {id:'siswa-rapor',label:'Rapor Saya',icon:'file'},
    {id:'siswa-absensi',label:'Absensi',icon:'check'},
    {id:'siswa-grafik',label:'Grafik Nilai',icon:'chart'},
    {id:'siswa-ranking',label:'Ranking',icon:'award'},
    {id:'siswa-pengumuman',label:'Pengumuman',icon:'bell'},
  ]},
];

// ─── PAGE RENDERER ────────────────────────────────────────────────────────────
const PageRenderer=({page,state,update,toast,setModal})=>{
  const props={state,update,toast,setModal};
  const map={
    'dashboard':<AdminDashboard {...props}/>,
    'data-siswa':<DataSiswa {...props}/>,
    'data-guru':<DataGuru {...props}/>,
    'data-kelas':<DataKelas {...props}/>,
    'data-semester':<DataSemester {...props}/>,
    'input-nilai':<InputNilai {...props}/>,
    'input-absensi':<InputAbsensi {...props}/>,
    'input-sikap':<InputSikap {...props}/>,
    'rapor-preview':<RaporPreview {...props}/>,
    'ranking':<RankingPage {...props}/>,
    'statistik':<StatistikPage {...props}/>,
    'kelola-akun':<KelolaAkun {...props}/>,
    'backup':<BackupPage {...props}/>,
    'pengumuman':<PengumumanAdmin {...props}/>,
    'siswa-dashboard':<SiswaDashboard {...props}/>,
    'siswa-rapor':<SiswaRapor {...props}/>,
    'siswa-absensi':<SiswaAbsensi {...props}/>,
    'siswa-grafik':<SiswaGrafik {...props}/>,
    'siswa-ranking':<SiswaRanking {...props}/>,
    'siswa-pengumuman':<SiswaPengumuman {...props}/>,
  };
  return map[page]||<div className="card"><p>Halaman tidak ditemukan.</p></div>;
};

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
const AdminDashboard=({state,update,toast})=>{
  const totalSiswa=state.siswa.length;
  const totalGuru=state.guru.length;
  const totalKelas=state.kelas.length;
  const nilaiCount=state.nilai.length;
  const sm=state.semester.find(s=>s.aktif)||state.semester[0];
  
  return(
    <div>
      <div style={{marginBottom:24}}>
        <h1 style={{fontSize:22,fontWeight:800,color:'var(--text)'}}>Dashboard Admin</h1>
        <p style={{color:'var(--text3)',fontSize:13,marginTop:2}}>Selamat datang! Tahun Ajaran {sm?.tahunAjaran} – {sm?.nama}</p>
      </div>
      <div className="grid-4" style={{marginBottom:24}}>
        {[
          {label:'Total Siswa',value:totalSiswa,icon:'users',color:'#1a56db',bg:'#e8f0fe'},
          {label:'Total Guru',value:totalGuru,icon:'book',color:'#059669',bg:'#d1fae5'},
          {label:'Kelas Aktif',value:totalKelas,icon:'calendar',color:'#7c3aed',bg:'#ede9fe'},
          {label:'Data Nilai',value:nilaiCount,icon:'chart',color:'#d97706',bg:'#fef3c7'},
        ].map(s=>(
          <div className="stat-card" key={s.label}>
            <div className="stat-icon" style={{background:s.bg,color:s.color}}><Icon name={s.icon} size={20}/></div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">Siswa Terbaru</span><button className="btn btn-sm btn-primary" onClick={()=>update({currentPage:'data-siswa'})}><Icon name="plus" size={14}/>Tambah</button></div>
          {state.siswa.slice(-5).reverse().map(s=>(
            <div key={s.id} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
              <div className="avatar">{s.nama.slice(0,2).toUpperCase()}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>{s.nama}</div>
                <div style={{fontSize:12,color:'var(--text3)'}}>{s.nis} · {s.kelas}</div>
              </div>
              <span className="badge badge-primary">{s.kelas}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Pengumuman</span></div>
          {state.pengumuman.map(p=>(
            <div key={p.id} className="announcement-item">
              <div style={{width:8,height:8,borderRadius:'50%',background:p.penting?'var(--danger)':'var(--text3)',marginTop:5,flexShrink:0}}/>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>{p.judul}</div>
                <div style={{fontSize:12,color:'var(--text3)',marginTop:2}}>{p.tanggal}</div>
              </div>
              {p.penting&&<span className="badge badge-danger" style={{marginLeft:'auto',flexShrink:0}}>Penting</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{marginTop:16}}>
        <div className="card-header"><span className="card-title">Akses Cepat</span></div>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          {[
            {label:'Input Nilai',page:'input-nilai',icon:'edit',color:'btn-primary'},
            {label:'Input Absensi',page:'input-absensi',icon:'check',color:'btn-secondary'},
            {label:'Preview Rapor',page:'rapor-preview',icon:'print',color:'btn-secondary'},
            {label:'Ranking Siswa',page:'ranking',icon:'award',color:'btn-secondary'},
            {label:'Statistik',page:'statistik',icon:'chart',color:'btn-secondary'},
            {label:'Kelola Siswa',page:'data-siswa',icon:'users',color:'btn-secondary'},
          ].map(a=>(
            <button key={a.label} className={`btn ${a.color}`} onClick={()=>update({currentPage:a.page})}>
              <Icon name={a.icon} size={15}/>{a.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── DATA SISWA ───────────────────────────────────────────────────────────────
const DataSiswa=({state,update,toast,setModal})=>{
  const[showForm,setShowForm]=useState(false);
  const[editData,setEditData]=useState(null);
  const[form,setForm]=useState({nis:'',nama:'',kelas:'',jenisKelamin:'L',tempatLahir:'',tanggalLahir:'',alamat:'',noHP:''});
  
  const filtered=state.siswa.filter(s=>{
    const q=state.searchQuery.toLowerCase();
    const matchQ=!q||s.nama.toLowerCase().includes(q)||s.nis.includes(q);
    const matchK=state.filterKelas==='semua'||s.kelas===state.filterKelas;
    return matchQ&&matchK;
  });

  const submit=()=>{
    if(!form.nama||!form.nis){toast('Nama dan NIS wajib diisi','error');return}
    if(editData){
      update({siswa:state.siswa.map(s=>s.id===editData.id?{...s,...form}:s)});
      toast('Data siswa diperbarui','success');
    }else{
      const newS={...form,id:'s'+Date.now()};
      update({siswa:[...state.siswa,newS]});
      toast('Siswa berhasil ditambahkan','success');
    }
    setShowForm(false);setEditData(null);setForm({nis:'',nama:'',kelas:'',jenisKelamin:'L',tempatLahir:'',tanggalLahir:'',alamat:'',noHP:''});
  };
  const editSiswa=(s)=>{setEditData(s);setForm({nis:s.nis,nama:s.nama,kelas:s.kelas,jenisKelamin:s.jenisKelamin,tempatLahir:s.tempatLahir,tanggalLahir:s.tanggalLahir,alamat:s.alamat,noHP:s.noHP});setShowForm(true)};
  const deleteSiswa=(id)=>{if(window.confirm('Hapus siswa ini?')){update({siswa:state.siswa.filter(s=>s.id!==id)});toast('Siswa dihapus','info')}};
  const kelasList=[...new Set(state.siswa.map(s=>s.kelas))];

  return(
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <div><h1 style={{fontSize:20,fontWeight:800}}>Data Siswa</h1><p style={{color:'var(--text3)',fontSize:13}}>{filtered.length} siswa ditemukan</p></div>
        <div style={{display:'flex',gap:8}}>
          <select className="form-select" style={{width:140}} value={state.filterKelas} onChange={e=>update({filterKelas:e.target.value})}>
            <option value="semua">Semua Kelas</option>
            {kelasList.map(k=><option key={k} value={k}>{k}</option>)}
          </select>
          <button className="btn btn-primary" onClick={()=>{setShowForm(true);setEditData(null);setForm({nis:'',nama:'',kelas:'',jenisKelamin:'L',tempatLahir:'',tanggalLahir:'',alamat:'',noHP:''})}}><Icon name="plus" size={16}/>Tambah Siswa</button>
        </div>
      </div>

      {showForm&&(
        <div className="card" style={{marginBottom:20,borderColor:'var(--primary)'}}>
          <div className="card-header"><span className="card-title">{editData?'Edit Siswa':'Tambah Siswa Baru'}</span><button className="btn-icon" onClick={()=>{setShowForm(false);setEditData(null)}}><Icon name="x" size={16}/></button></div>
          <div className="grid-3">
            <div className="form-group"><label className="form-label">NIS *</label><input className="form-input" value={form.nis} onChange={e=>setForm({...form,nis:e.target.value})} placeholder="2024001"/></div>
            <div className="form-group"><label className="form-label">Nama Lengkap *</label><input className="form-input" value={form.nama} onChange={e=>setForm({...form,nama:e.target.value})} placeholder="Nama siswa"/></div>
            <div className="form-group"><label className="form-label">Kelas</label>
              <select className="form-select" value={form.kelas} onChange={e=>setForm({...form,kelas:e.target.value})}>
                <option value="">Pilih kelas</option>
                {state.kelas.map(k=><option key={k.id} value={k.nama}>{k.nama}</option>)}
              </select>
            </div>
            <div className="form-group"><label className="form-label">Jenis Kelamin</label>
              <select className="form-select" value={form.jenisKelamin} onChange={e=>setForm({...form,jenisKelamin:e.target.value})}>
                <option value="L">Laki-laki</option><option value="P">Perempuan</option>
              </select>
            </div>
            <div className="form-group"><label className="form-label">Tempat Lahir</label><input className="form-input" value={form.tempatLahir} onChange={e=>setForm({...form,tempatLahir:e.target.value})} placeholder="Kota"/></div>
            <div className="form-group"><label className="form-label">Tanggal Lahir</label><input className="form-input" type="date" value={form.tanggalLahir} onChange={e=>setForm({...form,tanggalLahir:e.target.value})}/></div>
            <div className="form-group" style={{gridColumn:'1/-1'}}><label className="form-label">Alamat</label><input className="form-input" value={form.alamat} onChange={e=>setForm({...form,alamat:e.target.value})} placeholder="Alamat lengkap"/></div>
            <div className="form-group"><label className="form-label">No. HP</label><input className="form-input" value={form.noHP} onChange={e=>setForm({...form,noHP:e.target.value})} placeholder="08xxx"/></div>
          </div>
          <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
            <button className="btn btn-secondary" onClick={()=>{setShowForm(false);setEditData(null)}}>Batal</button>
            <button className="btn btn-primary" onClick={submit}><Icon name="check" size={15}/>Simpan</button>
          </div>
        </div>
      )}

      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>No</th><th>NIS</th><th>Nama</th><th>Kelas</th><th>J/K</th><th>No. HP</th><th>Aksi</th></tr></thead>
            <tbody>
              {filtered.length===0&&<tr><td colSpan={7} style={{textAlign:'center',color:'var(--text3)',padding:32}}>Tidak ada data siswa</td></tr>}
              {filtered.map((s,i)=>(
                <tr key={s.id}>
                  <td style={{color:'var(--text3)'}}>{i+1}</td>
                  <td style={{fontWeight:600}}>{s.nis}</td>
                  <td><div style={{display:'flex',alignItems:'center',gap:10}}><div className="avatar" style={{width:30,height:30,fontSize:11}}>{s.nama.slice(0,2).toUpperCase()}</div><div><div style={{fontWeight:600,color:'var(--text)'}}>{s.nama}</div><div style={{fontSize:11,color:'var(--text3)'}}>{s.tempatLahir}, {s.tanggalLahir}</div></div></div></td>
                  <td><span className="badge badge-primary">{s.kelas}</span></td>
                  <td>{s.jenisKelamin==='L'?'Laki-laki':'Perempuan'}</td>
                  <td style={{color:'var(--text3)'}}>{s.noHP}</td>
                  <td><div style={{display:'flex',gap:6}}><button className="btn-icon" onClick={()=>editSiswa(s)} data-tooltip="Edit"><Icon name="edit" size={15}/></button><button className="btn-icon" style={{color:'var(--danger)'}} onClick={()=>deleteSiswa(s.id)} data-tooltip="Hapus"><Icon name="trash" size={15}/></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── DATA GURU ────────────────────────────────────────────────────────────────
const DataGuru=({state,update,toast})=>{
  const[showForm,setShowForm]=useState(false);
  const[editData,setEditData]=useState(null);
  const[form,setForm]=useState({nip:'',nama:'',mapel:'',pendidikan:'S1',noHP:''});
  
  const submit=()=>{
    if(!form.nama){toast('Nama wajib diisi','error');return}
    if(editData){update({guru:state.guru.map(g=>g.id===editData.id?{...g,...form}:g)});toast('Data guru diperbarui','success')}
    else{update({guru:[...state.guru,{...form,id:'g'+Date.now()}]});toast('Guru ditambahkan','success')}
    setShowForm(false);setEditData(null);setForm({nip:'',nama:'',mapel:'',pendidikan:'S1',noHP:''});
  };

  return(
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <div><h1 style={{fontSize:20,fontWeight:800}}>Data Guru</h1><p style={{color:'var(--text3)',fontSize:13}}>{state.guru.length} guru terdaftar</p></div>
        <button className="btn btn-primary" onClick={()=>{setShowForm(true);setEditData(null);setForm({nip:'',nama:'',mapel:'',pendidikan:'S1',noHP:''})}}><Icon name="plus" size={16}/>Tambah Guru</button>
      </div>
      {showForm&&(
        <div className="card" style={{marginBottom:20,borderColor:'var(--primary)'}}>
          <div className="card-header"><span className="card-title">{editData?'Edit':'Tambah'} Guru</span><button className="btn-icon" onClick={()=>{setShowForm(false);setEditData(null)}}><Icon name="x" size={16}/></button></div>
          <div className="grid-3">
            <div className="form-group"><label className="form-label">NIP</label><input className="form-input" value={form.nip} onChange={e=>setForm({...form,nip:e.target.value})} placeholder="GP001"/></div>
            <div className="form-group"><label className="form-label">Nama *</label><input className="form-input" value={form.nama} onChange={e=>setForm({...form,nama:e.target.value})} placeholder="Nama lengkap + gelar"/></div>
            <div className="form-group"><label className="form-label">Mata Pelajaran</label><input className="form-input" value={form.mapel} onChange={e=>setForm({...form,mapel:e.target.value})} placeholder="Matematika"/></div>
            <div className="form-group"><label className="form-label">Pendidikan</label><select className="form-select" value={form.pendidikan} onChange={e=>setForm({...form,pendidikan:e.target.value})}><option>D3</option><option>S1</option><option>S2</option><option>S3</option></select></div>
            <div className="form-group"><label className="form-label">No. HP</label><input className="form-input" value={form.noHP} onChange={e=>setForm({...form,noHP:e.target.value})} placeholder="08xxx"/></div>
          </div>
          <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
            <button className="btn btn-secondary" onClick={()=>setShowForm(false)}>Batal</button>
            <button className="btn btn-primary" onClick={submit}><Icon name="check" size={15}/>Simpan</button>
          </div>
        </div>
      )}
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>No</th><th>NIP</th><th>Nama</th><th>Mata Pelajaran</th><th>Pendidikan</th><th>No. HP</th><th>Aksi</th></tr></thead>
            <tbody>
              {state.guru.map((g,i)=>(
                <tr key={g.id}>
                  <td style={{color:'var(--text3)'}}>{i+1}</td>
                  <td style={{fontWeight:600}}>{g.nip}</td>
                  <td><div style={{fontWeight:600,color:'var(--text)'}}>{g.nama}</div></td>
                  <td><span className="badge badge-purple">{g.mapel}</span></td>
                  <td>{g.pendidikan}</td>
                  <td style={{color:'var(--text3)'}}>{g.noHP}</td>
                  <td><div style={{display:'flex',gap:6}}>
                    <button className="btn-icon" onClick={()=>{setEditData(g);setForm({nip:g.nip,nama:g.nama,mapel:g.mapel,pendidikan:g.pendidikan,noHP:g.noHP});setShowForm(true)}}><Icon name="edit" size={15}/></button>
                    <button className="btn-icon" style={{color:'var(--danger)'}} onClick={()=>{if(window.confirm('Hapus?')){update({guru:state.guru.filter(x=>x.id!==g.id)});toast('Dihapus','info')}}}><Icon name="trash" size={15}/></button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── DATA KELAS ───────────────────────────────────────────────────────────────
const DataKelas=({state,update,toast})=>{
  const[activeTab,setActiveTab]=useState('kelas');
  const[showForm,setShowForm]=useState(false);
  const[formKelas,setFormKelas]=useState({nama:'',tingkat:'X',waliKelas:'',tahunAjaran:'2024/2025',kapasitas:30});
  const[showMapelForm,setShowMapelForm]=useState(false);
  const[formMapel,setFormMapel]=useState({kode:'',nama:'',guru:'',kelas:'',kkm:70,bobot:{harian:40,pas:30,pat:30}});

  const submitKelas=()=>{
    if(!formKelas.nama){toast('Nama kelas wajib','error');return}
    update({kelas:[...state.kelas,{...formKelas,id:'k'+Date.now()}]});
    toast('Kelas ditambahkan','success');setShowForm(false);setFormKelas({nama:'',tingkat:'X',waliKelas:'',tahunAjaran:'2024/2025',kapasitas:30});
  };
  const submitMapel=()=>{
    if(!formMapel.nama){toast('Nama mapel wajib','error');return}
    update({mapel:[...state.mapel,{...formMapel,id:'m'+Date.now()}]});
    toast('Mata pelajaran ditambahkan','success');setShowMapelForm(false);setFormMapel({kode:'',nama:'',guru:'',kelas:'',kkm:70,bobot:{harian:40,pas:30,pat:30}});
  };

  return(
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
        <h1 style={{fontSize:20,fontWeight:800}}>Kelas & Mata Pelajaran</h1>
      </div>
      <div className="tabs">
        <button className={`tab ${activeTab==='kelas'?'active':''}`} onClick={()=>setActiveTab('kelas')}>Kelas</button>
        <button className={`tab ${activeTab==='mapel'?'active':''}`} onClick={()=>setActiveTab('mapel')}>Mata Pelajaran</button>
      </div>
      {activeTab==='kelas'&&(
        <div>
          <div style={{display:'flex',justifyContent:'flex-end',marginBottom:16}}>
            <button className="btn btn-primary" onClick={()=>setShowForm(!showForm)}><Icon name="plus" size={16}/>Tambah Kelas</button>
          </div>
          {showForm&&(
            <div className="card" style={{marginBottom:16,borderColor:'var(--primary)'}}>
              <div className="grid-3">
                <div className="form-group"><label className="form-label">Nama Kelas</label><input className="form-input" value={formKelas.nama} onChange={e=>setFormKelas({...formKelas,nama:e.target.value})} placeholder="X-A"/></div>
                <div className="form-group"><label className="form-label">Tingkat</label><select className="form-select" value={formKelas.tingkat} onChange={e=>setFormKelas({...formKelas,tingkat:e.target.value})}><option>X</option><option>XI</option><option>XII</option></select></div>
                <div className="form-group"><label className="form-label">Wali Kelas</label><select className="form-select" value={formKelas.waliKelas} onChange={e=>setFormKelas({...formKelas,waliKelas:e.target.value})}><option value="">Pilih guru</option>{state.guru.map(g=><option key={g.id} value={g.nama}>{g.nama}</option>)}</select></div>
                <div className="form-group"><label className="form-label">Kapasitas</label><input className="form-input" type="number" value={formKelas.kapasitas} onChange={e=>setFormKelas({...formKelas,kapasitas:+e.target.value})}/></div>
              </div>
              <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}><button className="btn btn-secondary" onClick={()=>setShowForm(false)}>Batal</button><button className="btn btn-primary" onClick={submitKelas}>Simpan</button></div>
            </div>
          )}
          <div className="grid-3">
            {state.kelas.map(k=>(
              <div className="card" key={k.id}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
                  <span style={{fontSize:20,fontWeight:800,color:'var(--primary)'}}>{k.nama}</span>
                  <span className="badge badge-primary">Tingkat {k.tingkat}</span>
                </div>
                <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.8}}>
                  <div>👨‍🏫 {k.waliKelas||'Belum ditentukan'}</div>
                  <div>📅 {k.tahunAjaran}</div>
                  <div>👥 Kapasitas: {k.kapasitas} siswa</div>
                  <div>📊 Terisi: {state.siswa.filter(s=>s.kelas===k.nama).length} siswa</div>
                </div>
                <div style={{marginTop:12}}>
                  <div className="progress-bar"><div className="progress-fill" style={{width:`${Math.min(100,(state.siswa.filter(s=>s.kelas===k.nama).length/k.kapasitas)*100)}%`,background:'var(--primary)'}}/></div>
                  <div style={{fontSize:11,color:'var(--text3)',marginTop:4,textAlign:'right'}}>{Math.round((state.siswa.filter(s=>s.kelas===k.nama).length/k.kapasitas)*100)}% terisi</div>
                </div>
                <button className="btn-icon" style={{color:'var(--danger)',marginTop:8}} onClick={()=>{if(window.confirm('Hapus kelas?'))update({kelas:state.kelas.filter(c=>c.id!==k.id)})}}><Icon name="trash" size={14}/>Hapus</button>
              </div>
            ))}
          </div>
        </div>
      )}
      {activeTab==='mapel'&&(
        <div>
          <div style={{display:'flex',justifyContent:'flex-end',marginBottom:16}}>
            <button className="btn btn-primary" onClick={()=>setShowMapelForm(!showMapelForm)}><Icon name="plus" size={16}/>Tambah Mapel</button>
          </div>
          {showMapelForm&&(
            <div className="card" style={{marginBottom:16,borderColor:'var(--primary)'}}>
              <div className="grid-3">
                <div className="form-group"><label className="form-label">Kode</label><input className="form-input" value={formMapel.kode} onChange={e=>setFormMapel({...formMapel,kode:e.target.value})} placeholder="MAT"/></div>
                <div className="form-group"><label className="form-label">Nama Mapel</label><input className="form-input" value={formMapel.nama} onChange={e=>setFormMapel({...formMapel,nama:e.target.value})} placeholder="Matematika"/></div>
                <div className="form-group"><label className="form-label">Guru Pengampu</label><select className="form-select" value={formMapel.guru} onChange={e=>setFormMapel({...formMapel,guru:e.target.value})}><option value="">Pilih guru</option>{state.guru.map(g=><option key={g.id}>{g.nama}</option>)}</select></div>
                <div className="form-group"><label className="form-label">Kelas</label><select className="form-select" value={formMapel.kelas} onChange={e=>setFormMapel({...formMapel,kelas:e.target.value})}><option value="">Pilih kelas</option>{state.kelas.map(k=><option key={k.id}>{k.nama}</option>)}</select></div>
                <div className="form-group"><label className="form-label">KKM</label><input className="form-input" type="number" value={formMapel.kkm} onChange={e=>setFormMapel({...formMapel,kkm:+e.target.value})}/></div>
              </div>
              <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}><button className="btn btn-secondary" onClick={()=>setShowMapelForm(false)}>Batal</button><button className="btn btn-primary" onClick={submitMapel}>Simpan</button></div>
            </div>
          )}
          <div className="card">
            <div className="table-wrap">
              <table>
                <thead><tr><th>Kode</th><th>Nama Mapel</th><th>Guru</th><th>Kelas</th><th>KKM</th><th>Bobot (%)</th><th>Aksi</th></tr></thead>
                <tbody>
                  {state.mapel.map(m=>(
                    <tr key={m.id}>
                      <td><span className="badge badge-purple">{m.kode}</span></td>
                      <td style={{fontWeight:600,color:'var(--text)'}}>{m.nama}</td>
                      <td style={{color:'var(--text3)'}}>{m.guru}</td>
                      <td>{m.kelas}</td>
                      <td style={{fontWeight:600}}>{m.kkm}</td>
                      <td style={{fontSize:12}}>H:{m.bobot?.harian}% / PAS:{m.bobot?.pas}% / PAT:{m.bobot?.pat}%</td>
                      <td><button className="btn-icon" style={{color:'var(--danger)'}} onClick={()=>{if(window.confirm('Hapus?'))update({mapel:state.mapel.filter(x=>x.id!==m.id)})}}><Icon name="trash" size={14}/></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── DATA SEMESTER ────────────────────────────────────────────────────────────
const DataSemester=({state,update,toast})=>{
  const[form,setForm]=useState({nama:'',tahunAjaran:'',mulai:'',selesai:''});
  return(
    <div>
      <h1 style={{fontSize:20,fontWeight:800,marginBottom:20}}>Pengaturan Semester</h1>
      <div className="grid-2">
        <div>
          {state.semester.map(sm=>(
            <div className="card" key={sm.id} style={{marginBottom:12,borderColor:sm.aktif?'var(--success)':'var(--border)'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                <div><div style={{fontSize:15,fontWeight:700}}>{sm.nama}</div><div style={{fontSize:12,color:'var(--text3)'}}>{sm.tahunAjaran}</div></div>
                {sm.aktif?<span className="badge badge-success">Aktif</span>:<button className="btn btn-sm btn-secondary" onClick={()=>{update({semester:state.semester.map(s=>({...s,aktif:s.id===sm.id}))});toast(`${sm.nama} diaktifkan`,'success')}}>Aktifkan</button>}
              </div>
              <div style={{fontSize:13,color:'var(--text2)'}}>📅 {sm.mulai} s/d {sm.selesai}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <h3 style={{fontSize:14,fontWeight:700,marginBottom:16}}>Tambah Semester Baru</h3>
          <div className="form-group"><label className="form-label">Nama Semester</label><input className="form-input" value={form.nama} onChange={e=>setForm({...form,nama:e.target.value})} placeholder="Semester 1"/></div>
          <div className="form-group"><label className="form-label">Tahun Ajaran</label><input className="form-input" value={form.tahunAjaran} onChange={e=>setForm({...form,tahunAjaran:e.target.value})} placeholder="2024/2025"/></div>
          <div className="form-group"><label className="form-label">Tanggal Mulai</label><input className="form-input" type="date" value={form.mulai} onChange={e=>setForm({...form,mulai:e.target.value})}/></div>
          <div className="form-group"><label className="form-label">Tanggal Selesai</label><input className="form-input" type="date" value={form.selesai} onChange={e=>setForm({...form,selesai:e.target.value})}/></div>
          <button className="btn btn-primary" onClick={()=>{if(!form.nama){toast('Nama wajib','error');return}update({semester:[...state.semester,{...form,id:'sm'+Date.now(),aktif:false}]});toast('Semester ditambahkan','success');setForm({nama:'',tahunAjaran:'',mulai:'',selesai:''})}}>Simpan Semester</button>
        </div>
      </div>
    </div>
  );
};

// ─── INPUT NILAI ──────────────────────────────────────────────────────────────
const InputNilai=({state,update,toast})=>{
  const[selKelas,setSelKelas]=useState(state.kelas[0]?.nama||'');
  const[selSemester,setSelSemester]=useState('1');
  const[selSiswa,setSelSiswa]=useState('');
  const[editMode,setEditMode]=useState(false);
  const[nilaiForm,setNilaiForm]=useState({});

  const kelasOpts=[...new Set(state.kelas.map(k=>k.nama))];
  const siswaInKelas=state.siswa.filter(s=>s.kelas===selKelas);
  const mapelInKelas=state.mapel.filter(m=>m.kelas===selKelas);
  const siswaTerpilih=state.siswa.find(s=>s.id===selSiswa);

  const loadNilai=()=>{
    const nf={};
    mapelInKelas.forEach(m=>{
      const existing=state.nilai.find(n=>n.siswaId===selSiswa&&n.mapelId===m.id&&n.semester===selSemester);
      nf[m.id]=existing?{...existing}:{siswaId:selSiswa,mapelId:m.id,semester:selSemester,nilaiHarian:[0,0,0,0,0],nilaiPAS:0,nilaiPAT:0,catatan:''};
    });
    setNilaiForm(nf);setEditMode(true);
  };

  const saveNilai=()=>{
    const newNilai=[...state.nilai.filter(n=>!(n.siswaId===selSiswa&&n.semester===selSemester&&mapelInKelas.some(m=>m.id===n.mapelId)))];
    Object.values(nilaiForm).forEach(nv=>{if(nv.siswaId){newNilai.push({...nv,id:nv.id||('n'+Date.now()+Math.random())})}});
    const hist=[...state.nilaiHistory,{waktu:new Date().toLocaleString('id-ID'),siswa:siswaTerpilih?.nama,kelas:selKelas,semester:selSemester,oleh:'Admin'}];
    update({nilai:newNilai,nilaiHistory:hist.slice(-50)});
    toast('Nilai berhasil disimpan! ✅','success');setEditMode(false);
  };

  const setNilaiHarian=(mapelId,idx,val)=>{
    setNilaiForm(prev=>{const nf={...prev};nf[mapelId]={...nf[mapelId],nilaiHarian:nf[mapelId].nilaiHarian.map((v,i)=>i===idx?+val:v)};return nf});
  };

  return(
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <div><h1 style={{fontSize:20,fontWeight:800}}>Input Nilai Siswa</h1><p style={{color:'var(--text3)',fontSize:13}}>Input nilai harian, PAS, dan PAT</p></div>
      </div>
      <div className="card" style={{marginBottom:16}}>
        <div className="grid-3" style={{marginBottom:8}}>
          <div className="form-group" style={{marginBottom:0}}>
            <label className="form-label">Kelas</label>
            <select className="form-select" value={selKelas} onChange={e=>{setSelKelas(e.target.value);setSelSiswa('');setEditMode(false)}}>
              {kelasOpts.map(k=><option key={k}>{k}</option>)}
            </select>
          </div>
          <div className="form-group" style={{marginBottom:0}}>
            <label className="form-label">Semester</label>
            <select className="form-select" value={selSemester} onChange={e=>setSelSemester(e.target.value)}>
              <option value="1">Semester 1</option><option value="2">Semester 2</option>
            </select>
          </div>
          <div className="form-group" style={{marginBottom:0}}>
            <label className="form-label">Siswa</label>
            <select className="form-select" value={selSiswa} onChange={e=>{setSelSiswa(e.target.value);setEditMode(false)}}>
              <option value="">Pilih siswa</option>
              {siswaInKelas.map(s=><option key={s.id} value={s.id}>{s.nama}</option>)}
            </select>
          </div>
        </div>
        {selSiswa&&<button className="btn btn-primary" onClick={loadNilai}><Icon name="edit" size={15}/>Input / Edit Nilai</button>}
      </div>

      {editMode&&selSiswa&&(
        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title">Nilai: {siswaTerpilih?.nama}</span>
              <div style={{fontSize:12,color:'var(--text3)'}}>{selKelas} · Semester {selSemester}</div>
            </div>
            <button className="btn btn-success" onClick={saveNilai}><Icon name="check" size={15}/>Simpan Semua Nilai</button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th style={{minWidth:130}}>Mata Pelajaran</th>
                  {[1,2,3,4,5].map(i=><th key={i} style={{minWidth:65}}>Harian {i}</th>)}
                  <th style={{minWidth:65}}>Rata H</th>
                  <th style={{minWidth:70}}>PAS</th>
                  <th style={{minWidth:70}}>PAT</th>
                  <th style={{minWidth:70}}>Akhir</th>
                  <th>Pred</th>
                  <th style={{minWidth:100}}>KKM</th>
                </tr>
              </thead>
              <tbody>
                {mapelInKelas.map(m=>{
                  const nv=nilaiForm[m.id]||{nilaiHarian:[0,0,0,0,0],nilaiPAS:0,nilaiPAT:0};
                  const rh=avg(nv.nilaiHarian||[]);
                  const na=nilaiAkhir(nv,m.bobot||{harian:40,pas:30,pat:30});
                  const p=predikat(na);
                  return(
                    <tr key={m.id}>
                      <td style={{fontWeight:600,fontSize:12}}>{m.nama}<div style={{fontSize:10,color:'var(--text3)'}}>KKM: {m.kkm}</div></td>
                      {(nv.nilaiHarian||[0,0,0,0,0]).map((v,i)=>(
                        <td key={i}><input type="number" min="0" max="100" value={v} onChange={e=>setNilaiHarian(m.id,i,e.target.value)} style={{width:55,padding:'4px 6px',border:'1px solid var(--border2)',borderRadius:6,fontSize:12,background:'var(--surface)',color:'var(--text)'}}/></td>
                      ))}
                      <td style={{fontWeight:700,color:'var(--primary)'}}>{rh}</td>
                      <td><input type="number" min="0" max="100" value={nv.nilaiPAS} onChange={e=>setNilaiForm(prev=>({...prev,[m.id]:{...prev[m.id],nilaiPAS:+e.target.value}}))} style={{width:60,padding:'4px 6px',border:'1px solid var(--border2)',borderRadius:6,fontSize:12,background:'var(--surface)',color:'var(--text)'}}/></td>
                      <td><input type="number" min="0" max="100" value={nv.nilaiPAT} onChange={e=>setNilaiForm(prev=>({...prev,[m.id]:{...prev[m.id],nilaiPAT:+e.target.value}}))} style={{width:60,padding:'4px 6px',border:'1px solid var(--border2)',borderRadius:6,fontSize:12,background:'var(--surface)',color:'var(--text)'}}/></td>
                      <td style={{fontWeight:800,fontSize:15,color:na>=m.kkm?'var(--success)':'var(--danger)'}}>{na}</td>
                      <td><span className={`badge ${na>=90?'badge-success':na>=80?'badge-primary':na>=70?'badge-warning':'badge-danger'}`}>{p.huruf}</span></td>
                      <td><span style={{fontSize:11,color:na>=m.kkm?'var(--success)':'var(--danger)',fontWeight:700}}>{na>=m.kkm?'✅ Tuntas':'❌ Remedi'}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {state.nilaiHistory.length>0&&(
        <div className="card" style={{marginTop:16}}>
          <div className="card-header"><span className="card-title">Riwayat Perubahan Nilai</span></div>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Waktu</th><th>Siswa</th><th>Kelas</th><th>Semester</th><th>Oleh</th></tr></thead>
              <tbody>
                {[...state.nilaiHistory].reverse().slice(0,10).map((h,i)=>(
                  <tr key={i}><td style={{fontSize:12,color:'var(--text3)'}}>{h.waktu}</td><td>{h.siswa}</td><td>{h.kelas}</td><td>Sem {h.semester}</td><td style={{color:'var(--primary)'}}>{h.oleh}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── INPUT ABSENSI ────────────────────────────────────────────────────────────
const InputAbsensi=({state,update,toast})=>{
  const[selSiswa,setSelSiswa]=useState('');
  const[selSemester,setSelSemester]=useState('1');
  const[form,setForm]=useState({hadir:0,izin:0,sakit:0,alpa:0});

  const loadData=()=>{
    const ex=state.absensi.find(a=>a.siswaId===selSiswa&&a.semester===selSemester);
    if(ex)setForm({hadir:ex.hadir,izin:ex.izin,sakit:ex.sakit,alpa:ex.alpa});
    else setForm({hadir:0,izin:0,sakit:0,alpa:0});
  };
  useEffect(()=>{if(selSiswa)loadData()},[selSiswa,selSemester]);

  const save=()=>{
    const ex=state.absensi.find(a=>a.siswaId===selSiswa&&a.semester===selSemester);
    let newAbs;
    if(ex)newAbs=state.absensi.map(a=>a.id===ex.id?{...a,...form}:a);
    else newAbs=[...state.absensi,{id:'a'+Date.now(),siswaId:selSiswa,semester:selSemester,...form}];
    update({absensi:newAbs});toast('Absensi disimpan','success');
  };

  const total=form.hadir+form.izin+form.sakit+form.alpa;
  const pct=total?Math.round((form.hadir/total)*100):0;

  return(
    <div>
      <h1 style={{fontSize:20,fontWeight:800,marginBottom:20}}>Input Absensi</h1>
      <div className="grid-2">
        <div className="card">
          <div className="form-group"><label className="form-label">Siswa</label>
            <select className="form-select" value={selSiswa} onChange={e=>setSelSiswa(e.target.value)}>
              <option value="">Pilih siswa</option>
              {state.siswa.map(s=><option key={s.id} value={s.id}>{s.nama} ({s.kelas})</option>)}
            </select>
          </div>
          <div className="form-group"><label className="form-label">Semester</label>
            <select className="form-select" value={selSemester} onChange={e=>setSelSemester(e.target.value)}>
              <option value="1">Semester 1</option><option value="2">Semester 2</option>
            </select>
          </div>
          {selSiswa&&(
            <>
              <div className="grid-2">
                {[{k:'hadir',l:'Hadir',c:'var(--success)'},{k:'izin',l:'Izin',c:'var(--primary)'},{k:'sakit',l:'Sakit',c:'var(--warning)'},{k:'alpa',l:'Alpa',c:'var(--danger)'}].map(f=>(
                  <div className="form-group" key={f.k}>
                    <label className="form-label" style={{color:f.c}}>{f.l}</label>
                    <input className="form-input" type="number" min="0" value={form[f.k]} onChange={e=>setForm({...form,[f.k]:+e.target.value})}/>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary" onClick={save}><Icon name="check" size={15}/>Simpan Absensi</button>
            </>
          )}
        </div>
        <div>
          {selSiswa&&(
            <div className="card">
              <div style={{textAlign:'center',marginBottom:16}}>
                <div style={{fontSize:48,fontWeight:800,color:pct>=90?'var(--success)':pct>=75?'var(--warning)':'var(--danger)'}}>{pct}%</div>
                <div style={{fontSize:13,color:'var(--text3)'}}>Persentase Kehadiran</div>
              </div>
              <div className="progress-bar" style={{height:12,marginBottom:16}}><div className="progress-fill" style={{width:`${pct}%`,background:pct>=90?'var(--success)':pct>=75?'var(--warning)':'var(--danger)'}}/></div>
              <div className="grid-2">
                {[{l:'Hadir',v:form.hadir,c:'var(--success)'},{l:'Izin',v:form.izin,c:'var(--primary)'},{l:'Sakit',v:form.sakit,c:'var(--warning)'},{l:'Alpa',v:form.alpa,c:'var(--danger)'}].map(i=>(
                  <div key={i.l} style={{textAlign:'center',padding:12,borderRadius:10,border:'1px solid var(--border)'}}>
                    <div style={{fontSize:20,fontWeight:800,color:i.c}}>{i.v}</div>
                    <div style={{fontSize:12,color:'var(--text3)'}}>{i.l}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── INPUT SIKAP ──────────────────────────────────────────────────────────────
const InputSikap=({state,update,toast})=>{
  const[selSiswa,setSelSiswa]=useState('');
  const[selSemester,setSelSemester]=useState('1');
  const[form,setForm]=useState({spiritual:'Baik',sosial:'Baik',catatan:''});
  
  useEffect(()=>{
    if(selSiswa){
      const ex=state.sikap.find(s=>s.siswaId===selSiswa&&s.semester===selSemester);
      if(ex)setForm({spiritual:ex.spiritual,sosial:ex.sosial,catatan:ex.catatan});
      else setForm({spiritual:'Baik',sosial:'Baik',catatan:''});
    }
  },[selSiswa,selSemester]);

  const genAIDesc=()=>{
    const s=state.siswa.find(x=>x.id===selSiswa);
    if(!s){toast('Pilih siswa dulu','error');return}
    const descs=[
      `${s.nama} menunjukkan perilaku yang ${form.spiritual.toLowerCase()} dalam aspek spiritual dan ${form.sosial.toLowerCase()} dalam aspek sosial. Siswa aktif berpartisipasi dalam kegiatan kelas dan menunjukkan sikap yang positif terhadap pembelajaran.`,
      `Selama semester ini, ${s.nama} telah menunjukkan perkembangan sikap yang membanggakan. Dalam bidang spiritual, sikap yang ditunjukkan adalah ${form.spiritual.toLowerCase()}. Dalam interaksi sosial dengan teman dan guru, ${s.nama} bersikap ${form.sosial.toLowerCase()}.`,
    ];
    setForm(prev=>({...prev,catatan:descs[Math.floor(Math.random()*descs.length)]}));
    toast('Deskripsi otomatis berhasil dibuat','success');
  };

  const save=()=>{
    if(!selSiswa){toast('Pilih siswa dulu','error');return}
    const ex=state.sikap.find(s=>s.siswaId===selSiswa&&s.semester===selSemester);
    let newSikap;
    if(ex)newSikap=state.sikap.map(s=>s.id===ex.id?{...s,...form}:s);
    else newSikap=[...state.sikap,{id:'sk'+Date.now(),siswaId:selSiswa,semester:selSemester,...form}];
    update({sikap:newSikap});toast('Catatan sikap disimpan','success');
  };

  return(
    <div>
      <h1 style={{fontSize:20,fontWeight:800,marginBottom:20}}>Input Sikap & Catatan</h1>
      <div className="grid-2">
        <div className="card">
          <div className="form-group"><label className="form-label">Siswa</label>
            <select className="form-select" value={selSiswa} onChange={e=>setSelSiswa(e.target.value)}>
              <option value="">Pilih siswa</option>
              {state.siswa.map(s=><option key={s.id} value={s.id}>{s.nama} ({s.kelas})</option>)}
            </select>
          </div>
          <div className="form-group"><label className="form-label">Semester</label>
            <select className="form-select" value={selSemester} onChange={e=>setSelSemester(e.target.value)}>
              <option value="1">Semester 1</option><option value="2">Semester 2</option>
            </select>
          </div>
          <div className="form-group"><label className="form-label">Sikap Spiritual</label>
            <select className="form-select" value={form.spiritual} onChange={e=>setForm({...form,spiritual:e.target.value})}>
              <option>Sangat Baik</option><option>Baik</option><option>Cukup</option><option>Perlu Bimbingan</option>
            </select>
          </div>
          <div className="form-group"><label className="form-label">Sikap Sosial</label>
            <select className="form-select" value={form.sosial} onChange={e=>setForm({...form,sosial:e.target.value})}>
              <option>Sangat Baik</option><option>Baik</option><option>Cukup</option><option>Perlu Bimbingan</option>
            </select>
          </div>
          <div className="form-group">
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:6}}>
              <label className="form-label" style={{margin:0}}>Catatan Wali Kelas</label>
              <button className="btn btn-sm btn-secondary" onClick={genAIDesc}>✨ Auto AI Desc</button>
            </div>
            <textarea className="form-input" value={form.catatan} onChange={e=>setForm({...form,catatan:e.target.value})} rows={5} placeholder="Tuliskan catatan untuk siswa..."/>
          </div>
          <button className="btn btn-primary" onClick={save}><Icon name="check" size={15}/>Simpan Catatan</button>
        </div>
        <div>
          <div className="card">
            <h3 style={{fontSize:14,fontWeight:700,marginBottom:12}}>Data Sikap Semua Siswa</h3>
            {state.sikap.filter(s=>s.semester===selSemester).map(sk=>{
              const siswa=state.siswa.find(s=>s.id===sk.siswaId);
              return siswa?(
                <div key={sk.id} style={{padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:4}}>
                    <span style={{fontWeight:600,fontSize:13}}>{siswa.nama}</span>
                    <div style={{display:'flex',gap:6}}>
                      <span className="badge badge-success">{sk.spiritual}</span>
                      <span className="badge badge-primary">{sk.sosial}</span>
                    </div>
                  </div>
                  {sk.catatan&&<div style={{fontSize:12,color:'var(--text3)',lineHeight:1.5}}>{sk.catatan.slice(0,80)}...</div>}
                </div>
              ):null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── RAPOR PREVIEW ────────────────────────────────────────────────────────────
const RaporPreview=({state,update,toast})=>{
  const[selSiswa,setSelSiswa]=useState('');
  const[selSemester,setSelSemester]=useState('1');
  const qrRef=useRef(null);

  const siswa=state.siswa.find(s=>s.id===selSiswa);
  const kelas=state.kelas.find(k=>k.nama===siswa?.kelas);
  const absensi=state.absensi.find(a=>a.siswaId===selSiswa&&a.semester===selSemester);
  const sikapData=state.sikap.find(s=>s.siswaId===selSiswa&&s.semester===selSemester);
  const mapelKelas=state.mapel.filter(m=>m.kelas===siswa?.kelas);
  const nilaiSiswa=state.nilai.filter(n=>n.siswaId===selSiswa&&n.semester===selSemester);
  const sm=state.semester.find(s=>s.aktif)||state.semester[0];
  
  const nilaiData=mapelKelas.map(m=>{
    const nv=nilaiSiswa.find(n=>n.mapelId===m.id)||{nilaiHarian:[0,0,0,0,0],nilaiPAS:0,nilaiPAT:0,catatan:''};
    const rh=avg(nv.nilaiHarian||[]);
    const na=nilaiAkhir(nv,m.bobot||{harian:40,pas:30,pat:30});
    const p=predikat(na);
    return{mapel:m,nv,rh,na,p};
  });

  const rataRata=nilaiData.length?Math.round(nilaiData.reduce((s,n)=>s+n.na,0)/nilaiData.length):0;
  const ranking=rankingSiswa(state.siswa.filter(s=>s.kelas===siswa?.kelas),state.nilai,state.mapel,selSemester).find(r=>r.id===selSiswa)?.ranking||'-';

  const printRapor=()=>{
    const el=document.getElementById('rapor-print');
    if(!el)return;
    const win=window.open('','_blank');
    win.document.write(`<html><head><title>Rapor ${siswa?.nama}</title><style>
      *{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;font-size:11px;color:#1a1a2e;padding:20px}
      .header{display:flex;align-items:center;gap:16px;border-bottom:3px solid #1a56db;padding-bottom:12px;margin-bottom:16px}
      .header img{width:60px;height:60px;object-fit:contain}
      h1{font-size:18px;color:#1a56db;font-weight:800}table{width:100%;border-collapse:collapse;margin-bottom:16px}
      th{background:#e8f0fe;color:#1a56db;padding:6px 8px;border:1px solid #c7d7f9;font-size:10px;text-align:center}
      td{padding:6px 8px;border:1px solid #e2e8f0;font-size:10px;text-align:center}
      .section-title{background:#1a56db;color:#fff;padding:5px 10px;border-radius:4px;font-size:11px;font-weight:700;margin:12px 0 8px}
      @media print{body{padding:10px}}
    </style></head><body>${el.innerHTML}</body></html>`);
    win.document.close();win.focus();setTimeout(()=>{win.print();win.close()},500);
    toast('Membuka dialog cetak...','info');
  };

  useEffect(()=>{
    if(siswa&&qrRef.current){
      qrRef.current.innerHTML='';
      try{new QRCode(qrRef.current,{text:`RAPOR|${siswa.nis}|${siswa.nama}|${sm?.tahunAjaran}|SEM${selSemester}|AVG${rataRata}`,width:80,height:80,colorDark:'#1a56db'})}catch{}
    }
  },[selSiswa,selSemester,rataRata]);

  return(
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <h1 style={{fontSize:20,fontWeight:800}}>Preview & Cetak Rapor</h1>
        {selSiswa&&<div style={{display:'flex',gap:8}}>
          <button className="btn btn-success" onClick={printRapor}><Icon name="print" size={15}/>Cetak Rapor</button>
          <button className="btn btn-secondary" onClick={()=>toast('Fitur download PDF akan segera tersedia','info')}><Icon name="download" size={15}/>Download PDF</button>
        </div>}
      </div>
      <div style={{display:'flex',gap:12,marginBottom:16}}>
        <select className="form-select" style={{width:200}} value={selSiswa} onChange={e=>setSelSiswa(e.target.value)}>
          <option value="">Pilih siswa</option>
          {state.siswa.map(s=><option key={s.id} value={s.id}>{s.nama} ({s.kelas})</option>)}
        </select>
        <select className="form-select" style={{width:140}} value={selSemester} onChange={e=>setSelSemester(e.target.value)}>
          <option value="1">Semester 1</option><option value="2">Semester 2</option>
        </select>
      </div>

      {!selSiswa&&<div className="card" style={{textAlign:'center',padding:60,color:'var(--text3)'}}><Icon name="file" size={48} style={{opacity:.3,marginBottom:12}}/><div style={{fontSize:16,fontWeight:600}}>Pilih siswa untuk melihat rapor</div></div>}

      {selSiswa&&siswa&&(
        <div id="rapor-print" className="rapor-page" style={{border:'1px solid var(--border)',borderRadius:16}}>
          {/* HEADER */}
          <div className="rapor-header">
            <img src="https://i.ibb.co.com/27yRSD51/Logo-Brilliant-Set.png" onError={e=>{e.target.style.display='none'}} alt="Logo"/>
            <div style={{flex:1}}>
              <div style={{fontSize:18,fontWeight:800,color:'#1a56db'}}>BRILLIANT INSTITUTE</div>
              <div style={{fontSize:11,color:'#475569',fontStyle:'italic'}}>Centre of Knowledge</div>
              <div style={{fontSize:13,fontWeight:600,color:'#1a1a2e',marginTop:4}}>LAPORAN HASIL BELAJAR SISWA</div>
              <div style={{fontSize:11,color:'#475569'}}>Semester {selSemester} – Tahun Ajaran {sm?.tahunAjaran}</div>
            </div>
            <div ref={qrRef} style={{flexShrink:0}}/>
          </div>

          {/* DATA SISWA */}
          <div className="rapor-section">
            <div className="rapor-section h2">Data Siswa</div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 24px',fontSize:12}}>
              {[
                ['Nama','nama'],['NIS','nis'],['Kelas','kelas'],['Jenis Kelamin','jenisKelamin'],['Tempat/Tgl Lahir',''],['Wali Kelas','']
              ].map(([l,k],i)=>(
                <div key={i} style={{display:'flex',gap:8,padding:'4px 0',borderBottom:'1px dashed #e2e8f0'}}>
                  <span style={{width:130,color:'#475569',flexShrink:0}}>{l}</span>
                  <span>:</span>
                  <span style={{fontWeight:600}}>
                    {l==='Tempat/Tgl Lahir'?`${siswa.tempatLahir}, ${siswa.tanggalLahir}`:l==='Wali Kelas'?kelas?.waliKelas||'-':siswa[k]==='L'?'Laki-laki':siswa[k]==='P'?'Perempuan':siswa[k]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* NILAI */}
          <div className="rapor-section">
            <div className="rapor-section h2">Nilai Akademik</div>
            <table className="nilai-table">
              <thead>
                <tr>
                  <th style={{textAlign:'left',width:140}}>Mata Pelajaran</th>
                  <th>NH</th><th>PAS</th><th>PAT</th>
                  <th>Nilai Akhir</th><th>Predikat</th><th>Deskripsi</th>
                </tr>
              </thead>
              <tbody>
                {nilaiData.map(({mapel:m,nv,rh,na,p})=>(
                  <tr key={m.id}>
                    <td style={{textAlign:'left',fontWeight:600}}>{m.nama}</td>
                    <td>{rh}</td>
                    <td>{nv.nilaiPAS}</td>
                    <td>{nv.nilaiPAT}</td>
                    <td style={{fontWeight:800,fontSize:14,color:na>=m.kkm?'#059669':'#dc2626'}}>{na}</td>
                    <td><span className={p.cls} style={{fontSize:14}}>{p.huruf}</span></td>
                    <td style={{textAlign:'left',fontSize:10,color:'#475569'}}>{autoDesc(m.nama,na,siswa.nama)}</td>
                  </tr>
                ))}
                <tr style={{background:'#e8f0fe',fontWeight:700}}>
                  <td style={{textAlign:'left'}}>RATA-RATA</td>
                  <td colSpan={3}></td>
                  <td style={{fontSize:15,color:'#1a56db'}}>{rataRata}</td>
                  <td className={predikat(rataRata).cls}>{predikat(rataRata).huruf}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ABSENSI & SIKAP */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <div className="rapor-section">
              <div className="rapor-section h2">Kehadiran</div>
              <table className="nilai-table" style={{fontSize:12}}>
                <tbody>
                  {[['Hadir',absensi?.hadir||0],['Izin',absensi?.izin||0],['Sakit',absensi?.sakit||0],['Alpa',absensi?.alpa||0]].map(([l,v])=>(
                    <tr key={l}><td style={{textAlign:'left'}}>{l}</td><td style={{fontWeight:700}}>{v} hari</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rapor-section">
              <div className="rapor-section h2">Sikap</div>
              <table className="nilai-table" style={{fontSize:12}}>
                <tbody>
                  <tr><td style={{textAlign:'left'}}>Spiritual</td><td style={{fontWeight:700}}>{sikapData?.spiritual||'-'}</td></tr>
                  <tr><td style={{textAlign:'left'}}>Sosial</td><td style={{fontWeight:700}}>{sikapData?.sosial||'-'}</td></tr>
                  <tr><td style={{textAlign:'left'}}>Ranking</td><td style={{fontWeight:700,color:'#1a56db'}}>#{ranking}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CATATAN */}
          {sikapData?.catatan&&(
            <div className="rapor-section">
              <div className="rapor-section h2">Catatan Wali Kelas</div>
              <div style={{padding:12,background:'#f8faff',borderRadius:8,fontSize:12,lineHeight:1.7,fontStyle:'italic',color:'#475569',border:'1px solid #e8f0fe'}}>"{sikapData.catatan}"</div>
            </div>
          )}

          {/* TTD */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,marginTop:20,paddingTop:16,borderTop:'2px solid #1a56db'}}>
            {['Orang Tua/Wali','Wali Kelas','Kepala Lembaga'].map((t,i)=>(
              <div key={i} style={{textAlign:'center',fontSize:11}}>
                <div style={{color:'#475569',marginBottom:60}}>{t}</div>
                <div style={{borderTop:'1px solid #333',paddingTop:4,color:'#1a1a2e',fontWeight:600}}>
                  {t==='Wali Kelas'?kelas?.waliKelas||'(___________)':`(_____________)`}
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:12,fontSize:10,color:'#94a3b8',fontStyle:'italic'}}>
            Dokumen ini diterbitkan secara digital oleh Brilliant Institute · {new Date().toLocaleDateString('id-ID',{year:'numeric',month:'long',day:'numeric'})}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── RANKING ──────────────────────────────────────────────────────────────────
const RankingPage=({state})=>{
  const[selKelas,setSelKelas]=useState(state.kelas[0]?.nama||'');
  const[selSemester,setSelSemester]=useState('1');
  const siswaKelas=state.siswa.filter(s=>s.kelas===selKelas);
  const ranked=rankingSiswa(siswaKelas,state.nilai,state.mapel,selSemester);
  
  return(
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <h1 style={{fontSize:20,fontWeight:800}}>Ranking Siswa</h1>
        <div style={{display:'flex',gap:8}}>
          <select className="form-select" style={{width:140}} value={selKelas} onChange={e=>setSelKelas(e.target.value)}>
            {state.kelas.map(k=><option key={k.id} value={k.nama}>{k.nama}</option>)}
          </select>
          <select className="form-select" style={{width:140}} value={selSemester} onChange={e=>setSelSemester(e.target.value)}>
            <option value="1">Semester 1</option><option value="2">Semester 2</option>
          </select>
        </div>
      </div>
      <div className="grid-3" style={{marginBottom:20}}>
        {ranked.slice(0,3).map((r,i)=>(
          <div className="card" key={r.id} style={{textAlign:'center',borderColor:i===0?'#f59e0b':i===1?'#94a3b8':'#b45309'}}>
            <div style={{fontSize:32,marginBottom:8}}>{i===0?'🥇':i===1?'🥈':'🥉'}</div>
            <div style={{fontWeight:800,fontSize:16,color:'var(--text)'}}>{r.nama}</div>
            <div style={{fontSize:28,fontWeight:800,color:i===0?'#f59e0b':i===1?'#94a3b8':'#b45309',marginTop:4}}>{r.rataRata}</div>
            <div style={{fontSize:12,color:'var(--text3)'}}>Rata-rata nilai</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Ranking</th><th>Nama</th><th>Kelas</th><th>Rata-rata</th><th>Predikat</th><th>Mapel Diisi</th></tr></thead>
            <tbody>
              {ranked.map(r=>(
                <tr key={r.id}>
                  <td><div className={`rank-badge ${r.ranking===1?'rank-1':r.ranking===2?'rank-2':r.ranking===3?'rank-3':''}`} style={{background:r.ranking<=3?'transparent':'var(--surface2)',border:r.ranking>3?'1px solid var(--border)':'none'}}><strong>#{r.ranking}</strong></div></td>
                  <td><div style={{fontWeight:600,color:'var(--text)'}}>{r.nama}</div><div style={{fontSize:11,color:'var(--text3)'}}>{r.nis}</div></td>
                  <td><span className="badge badge-primary">{r.kelas}</span></td>
                  <td><span style={{fontSize:18,fontWeight:800,color:r.rataRata>=90?'var(--success)':r.rataRata>=75?'var(--primary)':'var(--text)'}}>{r.rataRata}</span></td>
                  <td><span className={`badge ${predikat(r.rataRata).huruf==='A'?'badge-success':predikat(r.rataRata).huruf==='B'?'badge-primary':predikat(r.rataRata).huruf==='C'?'badge-warning':'badge-danger'}`}>{predikat(r.rataRata).huruf} – {predikat(r.rataRata).desc}</span></td>
                  <td>{r.jumlahMapel} mapel</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── STATISTIK ────────────────────────────────────────────────────────────────
const StatistikPage=({state})=>{
  const chartRef=useRef(null);
  const chartInst=useRef(null);
  const[selKelas,setSelKelas]=useState(state.kelas[0]?.nama||'');

  useEffect(()=>{
    const siswaKelas=state.siswa.filter(s=>s.kelas===selKelas);
    const ranked=rankingSiswa(siswaKelas,state.nilai,state.mapel,'1');
    if(chartRef.current){
      if(chartInst.current)chartInst.current.destroy();
      chartInst.current=new Chart(chartRef.current,{
        type:'bar',
        data:{
          labels:ranked.map(r=>r.nama.split(' ')[0]),
          datasets:[{label:'Rata-rata Nilai',data:ranked.map(r=>r.rataRata),backgroundColor:ranked.map(r=>r.rataRata>=90?'#059669':r.rataRata>=80?'#1a56db':r.rataRata>=70?'#d97706':'#dc2626'),borderRadius:6}]
        },
        options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{min:0,max:100,ticks:{color:'#94a3b8'},grid:{color:'rgba(148,163,184,.1)'}},x:{ticks:{color:'#94a3b8'},grid:{display:false}}}}
      });
    }
  },[selKelas,state.nilai]);

  const totalSiswa=state.siswa.length;
  const totalNilai=state.nilai.length;
  const avgAll=state.nilai.length?Math.round(state.nilai.reduce((sum,n)=>{const m=state.mapel.find(mp=>mp.id===n.mapelId);return m?sum+nilaiAkhir(n,m.bobot||{harian:40,pas:30,pat:30}):sum},0)/state.nilai.length):0;

  return(
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <h1 style={{fontSize:20,fontWeight:800}}>Statistik Akademik</h1>
        <select className="form-select" style={{width:140}} value={selKelas} onChange={e=>setSelKelas(e.target.value)}>
          {state.kelas.map(k=><option key={k.id} value={k.nama}>{k.nama}</option>)}
        </select>
      </div>
      <div className="grid-3" style={{marginBottom:20}}>
        <div className="stat-card"><div className="stat-icon" style={{background:'#e8f0fe',color:'#1a56db'}}><Icon name="users" size={20}/></div><div className="stat-value">{totalSiswa}</div><div className="stat-label">Total Siswa</div></div>
        <div className="stat-card"><div className="stat-icon" style={{background:'#d1fae5',color:'#059669'}}><Icon name="chart" size={20}/></div><div className="stat-value">{totalNilai}</div><div className="stat-label">Total Entri Nilai</div></div>
        <div className="stat-card"><div className="stat-icon" style={{background:'#fef3c7',color:'#d97706'}}><Icon name="star" size={20}/></div><div className="stat-value">{avgAll}</div><div className="stat-label">Rata-rata Nilai</div></div>
      </div>
      <div className="card">
        <div className="card-header"><span className="card-title">Grafik Nilai Kelas {selKelas}</span></div>
        <div className="chart-container"><canvas ref={chartRef}/></div>
      </div>
    </div>
  );
};

// ─── KELOLA AKUN ──────────────────────────────────────────────────────────────
const KelolaAkun=({state,update,toast})=>{
  const[form,setForm]=useState({username:'',password:'',role:'siswa',name:''});
  return(
    <div>
      <h1 style={{fontSize:20,fontWeight:800,marginBottom:20}}>Kelola Akun Pengguna</h1>
      <div className="grid-2">
        <div className="card">
          <h3 style={{fontSize:14,fontWeight:700,marginBottom:16}}>Tambah Akun Baru</h3>
          <div className="form-group"><label className="form-label">Nama</label><input className="form-input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Nama lengkap"/></div>
          <div className="form-group"><label className="form-label">Username</label><input className="form-input" value={form.username} onChange={e=>setForm({...form,username:e.target.value})} placeholder="username"/></div>
          <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="password"/></div>
          <div className="form-group"><label className="form-label">Role</label><select className="form-select" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}><option value="admin">Admin</option><option value="siswa">Siswa</option></select></div>
          <button className="btn btn-primary" onClick={()=>{
            if(!form.username||!form.password||!form.name){toast('Semua field wajib diisi','error');return}
            if(state.users.find(u=>u.username===form.username)){toast('Username sudah ada','error');return}
            update({users:[...state.users,{...form,id:'u'+Date.now(),password:hashPwd(form.password)}]});
            toast('Akun berhasil dibuat','success');setForm({username:'',password:'',role:'siswa',name:''});
          }}><Icon name="plus" size={15}/>Buat Akun</button>
        </div>
        <div className="card">
          <h3 style={{fontSize:14,fontWeight:700,marginBottom:16}}>Daftar Akun ({state.users.length})</h3>
          {state.users.map(u=>(
            <div key={u.id} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
              <div className="avatar" style={{background:u.role==='admin'?'var(--primary-light)':'var(--success-light)',color:u.role==='admin'?'var(--primary)':'var(--success)'}}>{u.name.slice(0,2).toUpperCase()}</div>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13}}>{u.name}</div><div style={{fontSize:11,color:'var(--text3)'}}>@{u.username}</div></div>
              <span className={`badge ${u.role==='admin'?'badge-primary':'badge-success'}`}>{u.role}</span>
              {u.id!=='u1'&&u.id!=='u2'&&<button className="btn-icon" style={{color:'var(--danger)'}} onClick={()=>{update({users:state.users.filter(x=>x.id!==u.id)});toast('Akun dihapus','info')}}><Icon name="trash" size={14}/></button>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── BACKUP ───────────────────────────────────────────────────────────────────
const BackupPage=({state,toast})=>{
  const backup=()=>{
    const data=JSON.stringify(state,null,2);
    const blob=new Blob([data],{type:'application/json'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;a.download=`backup-brilliant-${new Date().toISOString().slice(0,10)}.json`;
    a.click();URL.revokeObjectURL(url);
    toast('Backup berhasil diunduh!','success');
  };
  const stats=[
    {l:'Siswa',v:state.siswa.length,icon:'users'},
    {l:'Guru',v:state.guru.length,icon:'book'},
    {l:'Kelas',v:state.kelas.length,icon:'calendar'},
    {l:'Mapel',v:state.mapel.length,icon:'book'},
    {l:'Nilai',v:state.nilai.length,icon:'chart'},
    {l:'Absensi',v:state.absensi.length,icon:'check'},
  ];
  return(
    <div>
      <h1 style={{fontSize:20,fontWeight:800,marginBottom:20}}>Backup Database</h1>
      <div className="card" style={{marginBottom:20}}>
        <div style={{display:'flex',alignItems:'center',gap:16,padding:12,background:'var(--success-light)',borderRadius:10,marginBottom:16}}>
          <Icon name="shield" size={24} style={{color:'var(--success)'}}/>
          <div><div style={{fontWeight:700,color:'var(--success)'}}>Data Aman</div><div style={{fontSize:12,color:'var(--text3)'}}>Semua data tersimpan di browser. Backup secara rutin untuk keamanan data.</div></div>
        </div>
        <div className="grid-3" style={{marginBottom:20}}>
          {stats.map(s=><div key={s.l} className="stat-card"><div style={{fontSize:20,fontWeight:800}}>{s.v}</div><div className="stat-label">{s.l}</div></div>)}
        </div>
        <div style={{display:'flex',gap:10}}>
          <button className="btn btn-primary" onClick={backup}><Icon name="download" size={15}/>Download Backup JSON</button>
          <button className="btn btn-secondary" onClick={()=>{
            const inp=document.createElement('input');inp.type='file';inp.accept='.json';
            inp.onchange=e=>{
              const f=e.target.files[0];if(!f)return;
              const r=new FileReader();r.onload=ev=>{try{const d=JSON.parse(ev.target.result);if(d.siswa&&d.nilai){localStorage.setItem('brilliantState',ev.target.result);toast('Data berhasil dipulihkan! Refresh halaman.','success')}else toast('File tidak valid','error')}catch{toast('Gagal membaca file','error')}};r.readAsText(f);
            };inp.click();
          }}><Icon name="upload" size={15}/>Restore Backup</button>
        </div>
      </div>
    </div>
  );
};

// ─── PENGUMUMAN ADMIN ─────────────────────────────────────────────────────────
const PengumumanAdmin=({state,update,toast})=>{
  const[form,setForm]=useState({judul:'',isi:'',tanggal:new Date().toISOString().slice(0,10),penting:false});
  return(
    <div>
      <h1 style={{fontSize:20,fontWeight:800,marginBottom:20}}>Kelola Pengumuman</h1>
      <div className="grid-2">
        <div className="card">
          <h3 style={{fontSize:14,fontWeight:700,marginBottom:16}}>Buat Pengumuman</h3>
          <div className="form-group"><label className="form-label">Judul</label><input className="form-input" value={form.judul} onChange={e=>setForm({...form,judul:e.target.value})} placeholder="Judul pengumuman"/></div>
          <div className="form-group"><label className="form-label">Isi</label><textarea className="form-input" value={form.isi} onChange={e=>setForm({...form,isi:e.target.value})} placeholder="Isi pengumuman..." rows={5}/></div>
          <div className="form-group"><label className="form-label">Tanggal</label><input className="form-input" type="date" value={form.tanggal} onChange={e=>setForm({...form,tanggal:e.target.value})}/></div>
          <div className="form-group" style={{display:'flex',alignItems:'center',gap:8}}>
            <input type="checkbox" id="penting" checked={form.penting} onChange={e=>setForm({...form,penting:e.target.checked})} style={{width:16,height:16}}/>
            <label htmlFor="penting" style={{fontSize:13,color:'var(--text)'}}>Tandai sebagai penting</label>
          </div>
          <button className="btn btn-primary" onClick={()=>{
            if(!form.judul||!form.isi){toast('Judul dan isi wajib diisi','error');return}
            update({pengumuman:[...state.pengumuman,{...form,id:'p'+Date.now()}]});
            toast('Pengumuman dipublikasikan','success');setForm({judul:'',isi:'',tanggal:new Date().toISOString().slice(0,10),penting:false});
          }}><Icon name="bell" size={15}/>Publikasikan</button>
        </div>
        <div>
          {state.pengumuman.map(p=>(
            <div key={p.id} className="card" style={{marginBottom:12,borderLeft:`3px solid ${p.penting?'var(--danger)':'var(--border2)'}`}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:6}}>
                <span style={{fontWeight:700,fontSize:13}}>{p.judul}</span>
                <div style={{display:'flex',gap:6,alignItems:'center'}}>
                  {p.penting&&<span className="badge badge-danger">Penting</span>}
                  <button className="btn-icon" style={{color:'var(--danger)'}} onClick={()=>{update({pengumuman:state.pengumuman.filter(x=>x.id!==p.id)});toast('Dihapus','info')}}><Icon name="trash" size={14}/></button>
                </div>
              </div>
              <div style={{fontSize:12,color:'var(--text3)',marginBottom:6}}>{p.tanggal}</div>
              <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.6}}>{p.isi}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SISWA PAGES
// ═══════════════════════════════════════════════════════════════════════════════

// SISWA: ambil siswa berdasarkan username (demo: siswa pertama)
const getSiswaFromUser=(user,siswaList)=>siswaList[0];// Demo: gunakan siswa pertama

const SiswaDashboard=({state,update})=>{
  const siswa=getSiswaFromUser(state.currentUser,state.siswa);
  if(!siswa)return<div className="card">Data siswa tidak ditemukan.</div>;
  
  const absensi=state.absensi.find(a=>a.siswaId===siswa.id&&a.semester===state.activeSemester);
  const nilaiSiswa=state.nilai.filter(n=>n.siswaId===siswa.id&&n.semester===state.activeSemester);
  const mapelList=state.mapel.filter(m=>m.kelas===siswa.kelas);
  const nilaiData=mapelList.map(m=>{
    const nv=nilaiSiswa.find(n=>n.mapelId===m.id)||{nilaiHarian:[0,0,0,0,0],nilaiPAS:0,nilaiPAT:0};
    return{mapel:m,na:nilaiAkhir(nv,m.bobot||{harian:40,pas:30,pat:30})};
  });
  const rataRata=nilaiData.length?Math.round(nilaiData.reduce((s,n)=>s+n.na,0)/nilaiData.length):0;
  const ranked=rankingSiswa(state.siswa.filter(s=>s.kelas===siswa.kelas),state.nilai,state.mapel,state.activeSemester);
  const ranking=ranked.find(r=>r.id===siswa.id)?.ranking||'-';
  const total=(absensi?.hadir||0)+(absensi?.izin||0)+(absensi?.sakit||0)+(absensi?.alpa||0);
  const pctHadir=total?Math.round(((absensi?.hadir||0)/total)*100):0;
  const sm=state.semester.find(s=>s.aktif)||state.semester[0];

  return(
    <div>
      <div className="profile-header" style={{marginBottom:20}}>
        <div style={{display:'flex',alignItems:'center',gap:16}}>
          <div style={{width:60,height:60,borderRadius:'50%',background:'rgba(255,255,255,.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,fontWeight:800,color:'#fff',flexShrink:0}}>{siswa.nama.slice(0,2).toUpperCase()}</div>
          <div>
            <div style={{fontSize:20,fontWeight:800,color:'#fff'}}>{siswa.nama}</div>
            <div style={{fontSize:13,color:'rgba(255,255,255,.8)'}}>NIS: {siswa.nis} · Kelas {siswa.kelas}</div>
            <div style={{fontSize:12,color:'rgba(255,255,255,.7)',marginTop:2}}>{sm?.tahunAjaran} · {sm?.nama}</div>
          </div>
        </div>
      </div>
      <div className="grid-4" style={{marginBottom:20}}>
        <div className="stat-card"><div className="stat-icon" style={{background:'#e8f0fe',color:'#1a56db'}}><Icon name="star" size={20}/></div><div className="stat-value">{rataRata}</div><div className="stat-label">Rata-rata Nilai</div></div>
        <div className="stat-card"><div className="stat-icon" style={{background:'#d1fae5',color:'#059669'}}><Icon name="award" size={20}/></div><div className="stat-value">#{ranking}</div><div className="stat-label">Ranking Kelas</div></div>
        <div className="stat-card"><div className="stat-icon" style={{background:'#fef3c7',color:'#d97706'}}><Icon name="check" size={20}/></div><div className="stat-value">{pctHadir}%</div><div className="stat-label">Kehadiran</div></div>
        <div className="stat-card"><div className="stat-icon" style={{background:'var(--purple-light)',color:'var(--purple)'}}><Icon name="book" size={20}/></div><div className="stat-value">{nilaiData.length}</div><div className="stat-label">Mata Pelajaran</div></div>
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">Nilai Terkini</span><button className="btn btn-sm btn-primary" onClick={()=>update({currentPage:'siswa-rapor'})}>Lihat Rapor</button></div>
          {nilaiData.slice(0,5).map(({mapel:m,na})=>(
            <div key={m.id} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 0',borderBottom:'1px solid var(--border)'}}>
              <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600}}>{m.nama}</div></div>
              <div style={{fontSize:18,fontWeight:800,color:na>=90?'var(--success)':na>=75?'var(--primary)':'var(--warning)'}}>{na}</div>
              <span className={`badge ${predikat(na).huruf==='A'?'badge-success':predikat(na).huruf==='B'?'badge-primary':'badge-warning'}`}>{predikat(na).huruf}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Pengumuman Terbaru</span></div>
          {state.pengumuman.slice(0,3).map(p=>(
            <div key={p.id} className="announcement-item">
              <div style={{width:8,height:8,borderRadius:'50%',background:p.penting?'var(--danger)':'var(--text3)',marginTop:5,flexShrink:0}}/>
              <div><div style={{fontSize:13,fontWeight:600}}>{p.judul}</div><div style={{fontSize:12,color:'var(--text3)'}}>{p.tanggal}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── SISWA RAPOR ──────────────────────────────────────────────────────────────
const SiswaRapor=({state,update,toast})=>{
  const siswa=getSiswaFromUser(state.currentUser,state.siswa);
  const[selSemester,setSelSemester]=useState('1');
  const qrRef=useRef(null);
  if(!siswa)return<div className="card">Data tidak tersedia.</div>;

  const kelas=state.kelas.find(k=>k.nama===siswa.kelas);
  const absensi=state.absensi.find(a=>a.siswaId===siswa.id&&a.semester===selSemester);
  const sikapData=state.sikap.find(s=>s.siswaId===siswa.id&&s.semester===selSemester);
  const mapelKelas=state.mapel.filter(m=>m.kelas===siswa.kelas);
  const nilaiSiswa=state.nilai.filter(n=>n.siswaId===siswa.id&&n.semester===selSemester);
  const sm=state.semester.find(s=>s.aktif)||state.semester[0];
  
  const nilaiData=mapelKelas.map(m=>{
    const nv=nilaiSiswa.find(n=>n.mapelId===m.id)||{nilaiHarian:[0,0,0,0,0],nilaiPAS:0,nilaiPAT:0};
    const rh=avg(nv.nilaiHarian||[]);
    const na=nilaiAkhir(nv,m.bobot||{harian:40,pas:30,pat:30});
    const p=predikat(na);
    return{mapel:m,nv,rh,na,p};
  });
  const rataRata=nilaiData.length?Math.round(nilaiData.reduce((s,n)=>s+n.na,0)/nilaiData.length):0;
  const ranking=rankingSiswa(state.siswa.filter(s=>s.kelas===siswa.kelas),state.nilai,state.mapel,selSemester).find(r=>r.id===siswa.id)?.ranking||'-';

  useEffect(()=>{
    if(qrRef.current){
      qrRef.current.innerHTML='';
      try{new QRCode(qrRef.current,{text:`RAPOR-BRILLIANTINSTITUTE|${siswa.nis}|SM${selSemester}|${sm?.tahunAjaran}|AVG${rataRata}`,width:80,height:80,colorDark:'#1a56db'})}catch{}
    }
  },[selSemester,rataRata]);

  const printRapor=()=>{
    const el=document.getElementById('siswa-rapor-print');
    if(!el)return;
    const win=window.open('','_blank');
    win.document.write(`<html><head><title>Rapor ${siswa.nama}</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;font-size:11px;color:#1a1a2e;padding:20px}h1{font-size:18px;color:#1a56db}table{width:100%;border-collapse:collapse;margin-bottom:12px}th{background:#e8f0fe;color:#1a56db;padding:5px 8px;border:1px solid #c7d7f9;font-size:10px;text-align:center}td{padding:5px 8px;border:1px solid #e2e8f0;font-size:10px;text-align:center}.header{display:flex;align-items:center;gap:12px;border-bottom:3px solid #1a56db;padding-bottom:10px;margin-bottom:14px}.sec{background:#1a56db;color:#fff;padding:4px 8px;border-radius:4px;font-size:10px;font-weight:bold;margin:10px 0 6px}@media print{body{padding:8px}}</style></head><body>${el.innerHTML}</body></html>`);
    win.document.close();win.focus();setTimeout(()=>{win.print();win.close()},500);
    toast('Membuka dialog cetak...','info');
  };

  return(
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <h1 style={{fontSize:20,fontWeight:800}}>Rapor Saya</h1>
        <div style={{display:'flex',gap:8}}>
          <select className="form-select" style={{width:140}} value={selSemester} onChange={e=>setSelSemester(e.target.value)}>
            <option value="1">Semester 1</option><option value="2">Semester 2</option>
          </select>
          <button className="btn btn-success" onClick={printRapor}><Icon name="print" size={15}/>Cetak / Download</button>
        </div>
      </div>
      <div id="siswa-rapor-print" className="rapor-page" style={{border:'1px solid var(--border)',borderRadius:16}}>
        <div className="rapor-header">
          <img src="https://i.ibb.co.com/27yRSD51/Logo-Brilliant-Set.png" onError={e=>{e.target.style.display='none'}} alt="Logo"/>
          <div style={{flex:1}}>
            <div style={{fontSize:18,fontWeight:800,color:'#1a56db'}}>BRILLIANT INSTITUTE</div>
            <div style={{fontSize:11,color:'#475569',fontStyle:'italic'}}>Centre of Knowledge</div>
            <div style={{fontSize:13,fontWeight:600,color:'#1a1a2e',marginTop:4}}>LAPORAN HASIL BELAJAR SISWA</div>
            <div style={{fontSize:11,color:'#475569'}}>Semester {selSemester} – Tahun Ajaran {sm?.tahunAjaran}</div>
          </div>
          <div ref={qrRef}/>
        </div>
        <div className="rapor-section">
          <div style={{display:'flex',alignItems:'center',gap:8,padding:'5px 10px',background:'#1a56db',color:'#fff',borderRadius:6,fontSize:11,fontWeight:700,marginBottom:10}}>Data Siswa</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 24px',fontSize:12}}>
            {[['Nama',siswa.nama],['NIS',siswa.nis],['Kelas',siswa.kelas],['Jenis Kelamin',siswa.jenisKelamin==='L'?'Laki-laki':'Perempuan'],['Tempat/Tgl Lahir',`${siswa.tempatLahir}, ${siswa.tanggalLahir}`],['Wali Kelas',kelas?.waliKelas||'-'],['Ranking',`#${ranking} di Kelas`],['Rata-rata',`${rataRata} (${predikat(rataRata).desc})`]].map(([l,v],i)=>(
              <div key={i} style={{display:'flex',gap:8,padding:'4px 0',borderBottom:'1px dashed #e2e8f0'}}>
                <span style={{width:130,color:'#475569',flexShrink:0}}>{l}</span>
                <span>:</span>
                <span style={{fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rapor-section">
          <div style={{display:'flex',alignItems:'center',gap:8,padding:'5px 10px',background:'#1a56db',color:'#fff',borderRadius:6,fontSize:11,fontWeight:700,marginBottom:10}}>Nilai Akademik</div>
          <table className="nilai-table">
            <thead><tr><th style={{textAlign:'left',width:140}}>Mata Pelajaran</th><th>NH</th><th>PAS</th><th>PAT</th><th>Nilai Akhir</th><th>Predikat</th><th>KKM</th><th>Deskripsi</th></tr></thead>
            <tbody>
              {nilaiData.map(({mapel:m,nv,rh,na,p})=>(
                <tr key={m.id}>
                  <td style={{textAlign:'left',fontWeight:600}}>{m.nama}</td>
                  <td>{rh}</td><td>{nv.nilaiPAS}</td><td>{nv.nilaiPAT}</td>
                  <td style={{fontWeight:800,fontSize:14,color:na>=m.kkm?'#059669':'#dc2626'}}>{na}</td>
                  <td><span className={p.cls} style={{fontSize:14,fontWeight:800}}>{p.huruf}</span></td>
                  <td style={{fontSize:10,color:na>=m.kkm?'#059669':'#dc2626',fontWeight:700}}>{na>=m.kkm?'Tuntas':'Remedi'}</td>
                  <td style={{textAlign:'left',fontSize:10,color:'#475569'}}>{autoDesc(m.nama,na,siswa.nama)}</td>
                </tr>
              ))}
              <tr style={{background:'#e8f0fe',fontWeight:700}}>
                <td style={{textAlign:'left'}}>RATA-RATA</td>
                <td colSpan={3}></td>
                <td style={{fontSize:15,color:'#1a56db'}}>{rataRata}</td>
                <td className={predikat(rataRata).cls}>{predikat(rataRata).huruf}</td>
                <td></td><td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:8,padding:'5px 10px',background:'#1a56db',color:'#fff',borderRadius:6,fontSize:11,fontWeight:700,marginBottom:10}}>Kehadiran</div>
            <table className="nilai-table" style={{fontSize:12}}>
              <tbody>
                {[['Hadir',absensi?.hadir||0,'#059669'],['Izin',absensi?.izin||0,'#1a56db'],['Sakit',absensi?.sakit||0,'#d97706'],['Alpa',absensi?.alpa||0,'#dc2626']].map(([l,v,c])=>(
                  <tr key={l}><td style={{textAlign:'left'}}>{l}</td><td style={{fontWeight:700,color:c}}>{v} hari</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <div style={{display:'flex',alignItems:'center',gap:8,padding:'5px 10px',background:'#1a56db',color:'#fff',borderRadius:6,fontSize:11,fontWeight:700,marginBottom:10}}>Sikap</div>
            <table className="nilai-table" style={{fontSize:12}}>
              <tbody>
                <tr><td style={{textAlign:'left'}}>Spiritual</td><td style={{fontWeight:700}}>{sikapData?.spiritual||'-'}</td></tr>
                <tr><td style={{textAlign:'left'}}>Sosial</td><td style={{fontWeight:700}}>{sikapData?.sosial||'-'}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        {sikapData?.catatan&&<div style={{marginTop:12,padding:12,background:'#f8faff',borderRadius:8,fontSize:12,lineHeight:1.7,fontStyle:'italic',color:'#475569',border:'1px solid #e8f0fe'}}>📝 <strong>Catatan Wali Kelas:</strong> "{sikapData.catatan}"</div>}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,marginTop:20,paddingTop:16,borderTop:'2px solid #1a56db'}}>
          {['Orang Tua/Wali','Wali Kelas','Kepala Lembaga'].map((t,i)=>(
            <div key={i} style={{textAlign:'center',fontSize:11}}>
              <div style={{color:'#475569',marginBottom:56}}>{t}</div>
              <div style={{borderTop:'1px solid #333',paddingTop:4,fontWeight:600}}>{t==='Wali Kelas'?kelas?.waliKelas||'(_____)':'(_____________)'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── SISWA ABSENSI ────────────────────────────────────────────────────────────
const SiswaAbsensi=({state})=>{
  const siswa=getSiswaFromUser(state.currentUser,state.siswa);
  const[sel,setSel]=useState('1');
  if(!siswa)return null;
  const ab=state.absensi.find(a=>a.siswaId===siswa.id&&a.semester===sel)||{hadir:0,izin:0,sakit:0,alpa:0};
  const total=ab.hadir+ab.izin+ab.sakit+ab.alpa;
  const pct=total?Math.round((ab.hadir/total)*100):0;
  return(
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <h1 style={{fontSize:20,fontWeight:800}}>Absensi Saya</h1>
        <select className="form-select" style={{width:140}} value={sel} onChange={e=>setSel(e.target.value)}>
          <option value="1">Semester 1</option><option value="2">Semester 2</option>
        </select>
      </div>
      <div className="grid-2">
        <div className="card" style={{textAlign:'center'}}>
          <div style={{fontSize:64,fontWeight:800,color:pct>=90?'var(--success)':pct>=75?'var(--warning)':'var(--danger)',lineHeight:1}}>{pct}%</div>
          <div style={{fontSize:14,color:'var(--text3)',marginBottom:16}}>Persentase Kehadiran</div>
          <div className="progress-bar" style={{height:14,marginBottom:16}}><div className="progress-fill" style={{width:`${pct}%`,background:pct>=90?'var(--success)':pct>=75?'var(--warning)':'var(--danger)'}}/></div>
          <div style={{fontSize:12,color:'var(--text3)'}}>
            {pct>=90?'✅ Kehadiran sangat baik!':pct>=75?'⚠️ Tingkatkan kehadiran Anda':'❌ Kehadiran perlu diperbaiki'}
          </div>
        </div>
        <div className="card">
          <div className="grid-2">
            {[{l:'Hadir',v:ab.hadir,c:'var(--success)',icon:'✅'},{l:'Izin',v:ab.izin,c:'var(--primary)',icon:'📋'},{l:'Sakit',v:ab.sakit,c:'var(--warning)',icon:'🏥'},{l:'Alpa',v:ab.alpa,c:'var(--danger)',icon:'❌'}].map(i=>(
              <div key={i.l} style={{padding:20,borderRadius:12,border:'1px solid var(--border)',textAlign:'center'}}>
                <div style={{fontSize:24,marginBottom:4}}>{i.icon}</div>
                <div style={{fontSize:28,fontWeight:800,color:i.c}}>{i.v}</div>
                <div style={{fontSize:12,color:'var(--text3)'}}>Hari {i.l}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:16,padding:12,background:'var(--surface2)',borderRadius:10,fontSize:12,color:'var(--text2)'}}>
            <strong>Total Hari Belajar:</strong> {total} hari
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── SISWA GRAFIK ─────────────────────────────────────────────────────────────
const SiswaGrafik=({state})=>{
  const siswa=getSiswaFromUser(state.currentUser,state.siswa);
  const chartRef=useRef(null);
  const chartInst=useRef(null);
  const[sel,setSel]=useState('1');
  if(!siswa)return null;

  useEffect(()=>{
    const mapelKelas=state.mapel.filter(m=>m.kelas===siswa.kelas);
    const nilaiSiswa=state.nilai.filter(n=>n.siswaId===siswa.id&&n.semester===sel);
    const data=mapelKelas.map(m=>{
      const nv=nilaiSiswa.find(n=>n.mapelId===m.id)||{nilaiHarian:[0,0,0,0,0],nilaiPAS:0,nilaiPAT:0};
      return{mapel:m.nama,na:nilaiAkhir(nv,m.bobot||{harian:40,pas:30,pat:30})};
    });
    if(chartRef.current){
      if(chartInst.current)chartInst.current.destroy();
      chartInst.current=new Chart(chartRef.current,{
        type:'radar',
        data:{
          labels:data.map(d=>d.mapel),
          datasets:[{label:'Nilai Akhir',data:data.map(d=>d.na),backgroundColor:'rgba(26,86,219,.15)',borderColor:'#1a56db',pointBackgroundColor:'#1a56db',borderWidth:2,pointRadius:4}]
        },
        options:{responsive:true,maintainAspectRatio:false,scales:{r:{min:0,max:100,ticks:{color:'#94a3b8',backdropColor:'transparent'},grid:{color:'rgba(148,163,184,.2)'},pointLabels:{color:'var(--text2)',font:{size:12}}}},plugins:{legend:{display:false}}}
      });
    }
  },[sel,state.nilai,state.mapel]);

  const nilaiSiswa=state.nilai.filter(n=>n.siswaId===siswa.id&&n.semester===sel);
  const mapelKelas=state.mapel.filter(m=>m.kelas===siswa.kelas);
  const nilaiData=mapelKelas.map(m=>{
    const nv=nilaiSiswa.find(n=>n.mapelId===m.id)||{nilaiHarian:[0,0,0,0,0],nilaiPAS:0,nilaiPAT:0};
    return{mapel:m,na:nilaiAkhir(nv,m.bobot||{harian:40,pas:30,pat:30})};
  });

  return(
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <h1 style={{fontSize:20,fontWeight:800}}>Grafik Perkembangan Nilai</h1>
        <select className="form-select" style={{width:140}} value={sel} onChange={e=>setSel(e.target.value)}>
          <option value="1">Semester 1</option><option value="2">Semester 2</option>
        </select>
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-header"><span className="card-title">Peta Nilai (Radar)</span></div>
          <div style={{height:300,position:'relative'}}><canvas ref={chartRef}/></div>
        </div>
        <div className="card">
          <div className="card-header"><span className="card-title">Detail per Mapel</span></div>
          {nilaiData.map(({mapel:m,na})=>(
            <div key={m.id} style={{marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                <span style={{fontSize:13,fontWeight:600}}>{m.mapel}</span>
                <div style={{display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:16,fontWeight:800,color:na>=90?'var(--success)':na>=75?'var(--primary)':'var(--warning)'}}>{na}</span>
                  <span className={`badge ${predikat(na).huruf==='A'?'badge-success':predikat(na).huruf==='B'?'badge-primary':'badge-warning'}`}>{predikat(na).huruf}</span>
                </div>
              </div>
              <div className="progress-bar"><div className="progress-fill" style={{width:`${na}%`,background:na>=90?'var(--success)':na>=75?'var(--primary)':'var(--warning)'}}/></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── SISWA RANKING ────────────────────────────────────────────────────────────
const SiswaRanking=({state})=>{
  const siswa=getSiswaFromUser(state.currentUser,state.siswa);
  const[sel,setSel]=useState('1');
  if(!siswa)return null;
  const siswaKelas=state.siswa.filter(s=>s.kelas===siswa.kelas);
  const ranked=rankingSiswa(siswaKelas,state.nilai,state.mapel,sel);
  const myRank=ranked.find(r=>r.id===siswa.id);

  return(
    <div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
        <h1 style={{fontSize:20,fontWeight:800}}>Ranking Kelas</h1>
        <select className="form-select" style={{width:140}} value={sel} onChange={e=>setSel(e.target.value)}>
          <option value="1">Semester 1</option><option value="2">Semester 2</option>
        </select>
      </div>
      {myRank&&(
        <div style={{background:'linear-gradient(135deg,#1a56db,#0ea5e9)',borderRadius:16,padding:20,color:'#fff',marginBottom:20,display:'flex',alignItems:'center',gap:16}}>
          <div style={{fontSize:48,fontWeight:800,minWidth:80,textAlign:'center'}}>{myRank.ranking===1?'🥇':myRank.ranking===2?'🥈':myRank.ranking===3?'🥉':`#${myRank.ranking}`}</div>
          <div>
            <div style={{fontSize:18,fontWeight:800}}>Ranking kamu: #{myRank.ranking}</div>
            <div style={{opacity:.9,fontSize:13}}>Rata-rata nilai: {myRank.rataRata} · Kelas {siswa.kelas}</div>
            <div style={{fontSize:12,opacity:.7,marginTop:2}}>{predikat(myRank.rataRata).desc}</div>
          </div>
        </div>
      )}
      <div className="card">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Rank</th><th>Nama</th><th>Rata-rata</th><th>Predikat</th></tr></thead>
            <tbody>
              {ranked.map(r=>(
                <tr key={r.id} style={{background:r.id===siswa.id?'var(--primary-light)':''}}>
                  <td style={{fontWeight:800,color:r.ranking===1?'#f59e0b':r.ranking===2?'#94a3b8':r.ranking===3?'#b45309':'var(--text)'}}>
                    {r.ranking===1?'🥇':r.ranking===2?'🥈':r.ranking===3?'🥉':`#${r.ranking}`}
                  </td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div className="avatar" style={{width:28,height:28,fontSize:10,background:r.id===siswa.id?'var(--primary)':'var(--primary-light)',color:r.id===siswa.id?'#fff':'var(--primary)'}}>{r.nama.slice(0,2).toUpperCase()}</div>
                      <div>
                        <div style={{fontWeight:r.id===siswa.id?800:600,color:r.id===siswa.id?'var(--primary)':'var(--text)'}}>{r.nama}{r.id===siswa.id&&' (Kamu)'}</div>
                        <div style={{fontSize:11,color:'var(--text3)'}}>{r.nis}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{fontSize:18,fontWeight:800,color:r.rataRata>=90?'var(--success)':r.rataRata>=75?'var(--primary)':'var(--warning)'}}>{r.rataRata}</td>
                  <td><span className={`badge ${predikat(r.rataRata).huruf==='A'?'badge-success':predikat(r.rataRata).huruf==='B'?'badge-primary':'badge-warning'}`}>{predikat(r.rataRata).huruf} – {predikat(r.rataRata).desc}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── SISWA PENGUMUMAN ─────────────────────────────────────────────────────────
const SiswaPengumuman=({state})=>(
  <div>
    <h1 style={{fontSize:20,fontWeight:800,marginBottom:20}}>Pengumuman</h1>
    {state.pengumuman.length===0&&<div className="card" style={{textAlign:'center',color:'var(--text3)',padding:40}}>Tidak ada pengumuman.</div>}
    {state.pengumuman.map(p=>(
      <div key={p.id} className="card" style={{marginBottom:12,borderLeft:`4px solid ${p.penting?'var(--danger)':'var(--primary)'}`,transition:'transform .15s'}} onMouseEnter={e=>e.currentTarget.style.transform='translateX(4px)'} onMouseLeave={e=>e.currentTarget.style.transform=''}>
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:12}}>
          <div style={{flex:1}}>
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:6}}>
              <span style={{fontSize:15,fontWeight:700,color:'var(--text)'}}>{p.judul}</span>
              {p.penting&&<span className="badge badge-danger">Penting</span>}
            </div>
            <div style={{fontSize:12,color:'var(--text3)',marginBottom:8}}>📅 {p.tanggal}</div>
            <div style={{fontSize:13,color:'var(--text2)',lineHeight:1.7}}>{p.isi}</div>
          </div>
          <Icon name="bell" size={20} style={{color:'var(--text3)',flexShrink:0,marginTop:2}}/>
        </div>
      </div>
    ))}
  </div>
);

// ─── MODAL RENDERER ───────────────────────────────────────────────────────────
const ModalRenderer=({modal,setModal,state,update,toast})=>(
  <div className="modal-overlay" onClick={()=>setModal(null)}>
    <div className="modal" onClick={e=>e.stopPropagation()}>
      <div className="modal-header">
        <span className="modal-title">{modal.title}</span>
        <button className="btn-icon" onClick={()=>setModal(null)}><Icon name="x" size={18}/></button>
      </div>
      {modal.content}
    </div>
  </div>
);

// ─── RENDER ───────────────────────────────────────────────────────────────────
const root=ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
