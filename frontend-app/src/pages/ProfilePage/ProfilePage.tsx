import React from 'react';
import { ProfileHeader } from '../../components/profile/ProfileHeader/ProfileHeader';
import { ProfileInfo } from '../../components/profile/ProfileMain/ProfileInfo';
import { ProfileStats } from '../../components/profile/ProfileMain/ProfileStats';
import { ProfileButtons } from '../../components/profile/ProfileButtons/ProfileButtons';
import { useAuth } from '../../shared/hooks/useAuth';
import { useUser } from '../../shared/hooks/useUser';
import { useUserOrders } from '../../shared/hooks/useUserOrders';
import { formatInitials } from '../../shared/utils/formatInitials';
import { formatDate } from '../../shared/utils/formatDate';

import './ProfilePage.scss';

export const ProfilePage: React.FC = () => {
   const { userId } = useAuth();
   const { user } = useUser(userId);

   const { orders: activeOrders } = useUserOrders({
      userId,
      status: 'IN_PROGRESS',
   });

   const { orders: completedOrders } = useUserOrders({
      userId,
      status: 'COMPLETED',
   });

   return (
      <div className="profile-page">
         <ProfileHeader name={user?.name} initials={formatInitials(user)} />

         <div className="profile-page__container">
            <ProfileInfo
               phone={user?.phone}
               // address={user?.address}
               birthDate={formatDate(user?.birthday)}
               email={user?.email}
            />

            <ProfileStats
               active={activeOrders.length}
               completed={completedOrders.length}
               since={formatDate(user?.registeredAt)}
            // rating={4.9}
            />
         </div>

         <ProfileButtons />
      </div>
   );
};
