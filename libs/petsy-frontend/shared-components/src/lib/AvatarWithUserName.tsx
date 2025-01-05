import { Avatar, AvatarImage } from '@petsy/shadcn-components';
import { Typography } from './Typography';

export function AvatarWithUserName({
  imageUrl,
  fullName,
  avatarClassName,
}: {
  imageUrl: string;
  fullName: string | null | undefined;
  avatarClassName?: string;
}) {
  return (
    <div className="flex items-center space-x-2 ">
      <Avatar className={avatarClassName}>
        {imageUrl && <AvatarImage src={imageUrl} alt="User avatar" />}
      </Avatar>

      <Typography className="text-sm">{fullName}</Typography>
    </div>
  );
}
