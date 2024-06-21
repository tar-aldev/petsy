import Image from 'next/image';

import row1Col1 from '../assets/img/row-1-col-1.png';
import row1Col2 from '../assets/img/row-1-col-2.png';
import row1Col3 from '../assets/img/row-1-col-3.png';

import row2Col1 from '../assets/img/row-2-col-1.png';
import row2Col2 from '../assets/img/row-2-col-2.png';
import row2Col3 from '../assets/img/row-2-col-3.png';

import row3Col1 from '../assets/img/row-3-col-1.png';
import row3Col2 from '../assets/img/row-3-col-2.png';
import row3Col3 from '../assets/img/row-3-col-3.png';

export function Gallery() {
  return (
    <section className="w-full grid grid-cols-3 grid-rows-24 gap-2">
      <div className="bg-slate-400 row-span-7 rounded-sm relative">
        <Image src={row1Col1} alt="gallery image" fill />
      </div>

      <div className="bg-orange-500 row-span-9 rounded-sm relative">
        <Image src={row1Col2} alt="gallery image" fill />
      </div>

      <div className="bg-amber-500 row-span-9 rounded-sm relative">
        <Image src={row1Col3} alt="gallery image" fill />
      </div>

      {/* Second row */}
      <div className="bg-slate-400 row-span-7 rounded-sm relative">
        <Image src={row2Col1} alt="gallery image" fill />
      </div>

      <div className="bg-orange-500 row-span-7 rounded-sm relative">
        <Image src={row2Col2} alt="gallery image" fill />
      </div>

      <div className="bg-amber-500 row-span-8 rounded-sm relative">
        <Image src={row2Col3} alt="gallery image" fill />
      </div>

      {/* Third row */}
      <div className="bg-slate-400 row-span-10 rounded-sm relative">
        <Image src={row3Col1} alt="gallery image" fill />
      </div>

      <div className="bg-orange-500 row-span-8 rounded-sm relative">
        <Image src={row3Col2} alt="gallery image" fill />
      </div>

      <div className="bg-amber-500 row-span-7 rounded-sm relative">
        <Image src={row3Col3} alt="gallery image" fill />
      </div>
    </section>
  );
}
