import s from './MetadataBar.module.css';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

export function MetadataBar({
  accountName = 'No specific account',
  dateCreated,
}) {
  const timeCreated = dayjs(dateCreated).format('HH:mm');
  return (
    <div className={s.metadataBar}>
      <div>
        <p>{accountName}</p>
      </div>
      <div>
        <p>
          {dayjs(dateCreated).calendar(null, {
            sameDay: '[Today]', // The same day ( Today )
            sameWeek: 'dddd', // A day of the same week ( Wednesday )
            lastDay: '[Yesterday]', // The day before ( Yesterday at 2:30 AM )
            sameElse: 'DD/MM/YYYY', // Everything else ( 7/10/2011 )
          })}
        </p>
        <time dateTime={timeCreated}>{timeCreated}</time>
      </div>
    </div>
  );
}
