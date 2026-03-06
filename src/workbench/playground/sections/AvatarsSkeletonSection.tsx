import { Avatar } from '@components/ui/Avatar';
import { Skeleton } from '@components/ui/Skeleton';

import { Section, SubLabel } from '../shared';

export function AvatarsSkeletonSection() {
  return (
    <Section number="07" title="avatars & skeleton">
      <div className="space-y-8">
        <div>
          <SubLabel>avatars</SubLabel>
          <div className="flex flex-wrap items-center gap-4">
            <Avatar alt="small" size="sm" />
            <Avatar alt="medium" fallback="AB" size="md" />
            <Avatar alt="large" size="lg" />
            <Avatar src="https://i.pravatar.cc/150?u=devkit" alt="with image" size="lg" />
          </div>
        </div>

        <div>
          <SubLabel>skeleton loading</SubLabel>
          <div className="max-w-sm space-y-3">
            <Skeleton variant="text" />
            <Skeleton variant="text" width="60%" />
            <div className="flex items-center gap-4">
              <Skeleton variant="circle" width="3rem" height="3rem" />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" />
                <Skeleton variant="text" width="75%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
