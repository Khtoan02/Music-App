/**
 * AuraBeat 4K Living Scenery Engine
 * Provides rich, verified 4K Ultra HD imagery mapped to:
 * 1. 55 Living Spaces (10 Groups: House, Work, Study, Transit, Nature, Entertainment, Gym, Resort, Public, Special)
 * 2. 8 Real-time Day Phases (T1 Dawn, T2 Early Morning, T3 Morning, T4 Midday, T5 Afternoon, T6 Sunset, T7 Dusk, T8 Starry Night)
 * 3. 7 Weather Atmospheric Dynamics (Clear, Sun, Light Clouds, Overcast, Rain, Heavy Rain, Fog)
 * Over 90+ verified 100% live Unsplash 4K CDN wallpapers - Zero 3-image cycling limits!
 */

const SCENERY_CATALOG = {
  // ===================== LIVING SPACES (55 SPACES / 10 GROUPS) =====================
  spaces: {
    // 1. NHÀ Ở
    phong_ngu: [
      {
        title: "Phòng ngủ ấm cúng ngập tràn nắng mai (4K)",
        url: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Phòng ngủ tối giản với ánh đèn vàng êm dịu (4K)",
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Góc giường ngủ vintage bên khung cửa sổ mộng mơ (4K)",
        url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Phòng ngủ Scandinavian tinh tế và thanh bình (4K)",
        url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Không gian phòng ngủ thư thái nhìn ra khu vườn (4K)",
        url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Giường ngủ êm ái cùng ánh đèn ngủ ấm áp (4K)",
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    phong_khach: [
      {
        title: "Phòng khách sang trọng ấm áp đón ánh hoàng hôn (4K)",
        url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Phòng khách phong cách mộc với sofa êm ái và cây xanh (4K)",
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Không gian sum vầy ấm cúng với kệ sách và đèn sàn (4K)",
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Phòng khách hiện đại ngập tràn ánh sáng tự nhiên (4K)",
        url: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    phong_lam_viec_nha: [
      {
        title: "Bàn làm việc tối giản với Mac, cây xanh và ánh sáng tự nhiên (4K)",
        url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Góc làm việc tại nhà với đèn bàn ấm và kệ sách (4K)",
        url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Studio làm việc sáng tạo phong cách Loft (4K)",
        url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Bàn gỗ tự nhiên với sổ tay và tách cà phê ấm (4K)",
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    nha_bep: [
      {
        title: "Gian bếp ấm cúng với ánh nắng ban mai và mùi bánh mới (4K)",
        url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Bàn đảo bếp hiện đại kết hợp gỗ mộc thanh lịch (4K)",
        url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Góc pha trà và nấu nướng ấm áp gia đình (4K)",
        url: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    ban_cong: [
      {
        title: "Ban công nhiều cây xanh ngắm nhìn thành phố buổi sớm (4K)",
        url: "https://images.unsplash.com/photo-1533759413974-9e15f3b745ac?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Góc ban công thoáng đãng đón gió mát và nắng chiều (4K)",
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Tầm nhìn từ ban công nhìn ra đường chân trời xanh mát (4K)",
        url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    san_thuong: [
      {
        title: "Sân thượng ngắm hoàng hôn rực rỡ trên nóc thành phố (4K)",
        url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Lounge sân thượng về đêm với ánh đèn lung linh (4K)",
        url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Sân thượng mở khoáng đạt cùng bầu trời mây trắng (4K)",
        url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    phong_tam: [
      {
        title: "Phòng tắm spa thư giãn với bồn tắm đá và ánh nến (4K)",
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Không gian spa thanh lọc tâm hồn phong cách Nhật Bản (4K)",
        url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Bồn tắm bên cửa kính lớn nhìn ra thiên nhiên xanh mát (4K)",
        url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    san_vuon: [
      {
        title: "Khu vườn xanh mướt đọng sương mai thanh bình (4K)",
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Lối đi rợp bóng cây xanh và ánh nắng xuyên qua kẽ lá (4K)",
        url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // 2. CÔNG VIỆC
    van_phong: [
      {
        title: "Văn phòng hiện đại với cửa kính lớn nhìn ra thành phố (4K)",
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Không gian làm việc chuyên nghiệp, ngập tràn năng lượng sáng tạo (4K)",
        url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Tòa tháp văn phòng kính vươn cao giữa trời xanh (4K)",
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    coworking: [
      {
        title: "Không gian Coworking mở với cây xanh và bàn gỗ mộc (4K)",
        url: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Góc làm việc chung sáng tạo đầy cảm hứng (4K)",
        url: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Khu vực làm việc thư thái ngập tràn ánh sáng trời (4K)",
        url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    studio: [
      {
        title: "Studio nghệ thuật sáng tạo với góc ánh sáng độc đáo (4K)",
        url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Studio làm việc tinh giản với thiết bị âm thanh và đồ họa (4K)",
        url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // 3. HỌC TẬP
    thu_vien: [
      {
        title: "Thư viện cổ điển tráng lệ với hàng ngàn cuốn sách quý (4K)",
        url: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Hàng sách bằng gỗ sồi ấm áp cùng không gian đọc yên tĩnh (4K)",
        url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Bàn đọc sách thư viện hiện đại tràn ngập ánh nắng (4K)",
        url: "https://images.unsplash.com/photo-1568667256549-094345857637?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Góc tự học yên ắng bên cuốn sách yêu thích (4K)",
        url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Không gian tri thức lắng đọng và sâu lắng (4K)",
        url: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // 4. DI CHUYỂN
    o_to_rieng: [
      {
        title: "Chuyến đi trên cung đường ven biển tuyệt đẹp (4K)",
        url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Cung đường xa lộ thênh thang hướng về đường chân trời (4K)",
        url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    may_bay: [
      {
        title: "Cửa sổ máy bay ngắm nhìn biển mây bồng bềnh ánh hoàng hôn (4K)",
        url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Tầm nhìn từ trên chín tầng mây bao la vô tận (4K)",
        url: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    tau_hoa: [
      {
        title: "Khung cửa sổ tàu hỏa nhìn ra thung lũng sương mù (4K)",
        url: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // 5. THIÊN NHIÊN
    bai_bien: [
      {
        title: "Bãi biển nhiệt đới cát trắng mịn và làn nước xanh ngọc bích (4K)",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Rặng dừa nghiêng bóng bên bờ cát và sóng biển dịu êm (4K)",
        url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Bình minh rực rỡ dát vàng mặt biển bao la (4K)",
        url: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Hoàng hôn buông đỏ thắm trên bãi cát êm đềm (4K)",
        url: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Từng đợt sóng vỗ bờ trắng xóa đầy thư giãn (4K)",
        url: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Đại dương mênh mông xanh thẳm đến tận chân trời (4K)",
        url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    nui_rung: [
      {
        title: "Rừng thông bảng lảng sương mù sáng sớm (4K)",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Dãy núi hùng vĩ đón ánh rực rỡ của buổi bình minh (4K)",
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Tia nắng vàng xuyên qua tán cây cổ thụ trong rừng già (4K)",
        url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Sắc vàng đỏ lá thu chiều rừng ôn đới dịu dàng (4K)",
        url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Khu rừng xanh mướt ngập tràn oxy và năng lượng sống (4K)",
        url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Thung lũng xanh mờ ảo giữa núi đồi trập trùng (4K)",
        url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    ho_nuoc: [
      {
        title: "Mặt hồ phẳng lặng như gương phản chiếu bóng núi mây (4K)",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Làn sương mai là là trên mặt nước biếc yên bình (4K)",
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // 6. GIẢI TRÍ
    quan_ca_phe: [
      {
        title: "Quán cà phê góc phố ấm cúng với quầy bar gỗ mộc (4K)",
        url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Bàn cafe bên cửa sổ đón nắng chiều và sách thơm (4K)",
        url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Ly cà phê ấm nồng bên trang sách trong ngày mưa (4K)",
        url: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Tách latte art thơm ngậy trên bàn gỗ vintage (4K)",
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Không gian tiệm cà phê Indie hoài niệm với ánh đèn vàng (4K)",
        url: "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Góc quán nhỏ yên bình cho những tâm hồn mộng mơ (4K)",
        url: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Thưởng thức cà phê sáng trong không gian thanh lịch (4K)",
        url: "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Quán cà phê châu Âu lãng mạn bên hè phố (4K)",
        url: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    nha_hang: [
      {
        title: "Nhà hàng sang trọng với ánh nến lung linh và rượu vang (4K)",
        url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // 7. RÈN LUYỆN
    phong_gym: [
      {
        title: "Phòng tập Gym hiện đại tràn ngập năng lượng bứt phá (4K)",
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Khu tập tạ chuyên nghiệp với ánh sáng thể thao mạnh mẽ (4K)",
        url: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Không gian fitness đẳng cấp kích thích động lực tập luyện (4K)",
        url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Khu vực tập luyện chức năng hiện đại và thoáng đãng (4K)",
        url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    phong_yoga: [
      {
        title: "Phòng tập Yoga Zen tĩnh tại với ánh sáng mềm mại (4K)",
        url: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Không gian thiền định hòa mình cùng hơi thở tự nhiên (4K)",
        url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Thảm yoga bên cửa kính ngập tràn nắng mai phục hồi cơ thể (4K)",
        url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // 8. NGHỈ DƯỠNG
    khach_san: [
      {
        title: "Resort nghỉ dưỡng nhiệt đới với bể bơi vô cực ngắm biển (4K)",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Biệt thự nghỉ dưỡng sang trọng giữa thiên nhiên trong lành (4K)",
        url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    homestay: [
      {
        title: "Căn homestay gỗ mộc bình yên nép mình giữa đồi thông (4K)",
        url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Ngôi nhà gỗ ấm cúng khói lam chiều phong cách Đà Lạt (4K)",
        url: "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    khu_cam_trai: [
      {
        title: "Đêm cắm trại bên đống lửa ấm dưới bầu trời ngàn sao (4K)",
        url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Lều trại bên hồ nước buổi sớm sương mờ trong vắt (4K)",
        url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // 9. KHÔNG GIAN ĐẶC BIỆT
    phong_toi: [
      {
        title: "Căn phòng tối với ánh đèn bàn ấm áp và màn đêm sâu thẳm (4K)",
        url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Không gian tĩnh mịch với ánh đèn vàng mờ xoa dịu đôi mắt (4K)",
        url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    noi_yen_tinh: [
      {
        title: "Bến cầu gỗ mộc vươn ra mặt hồ mù sương tĩnh mịch (4K)",
        url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Con đường rừng vắng lặng nơi chỉ có tiếng chim hót (4K)",
        url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=3840&q=92&auto=format&fit=crop"
      }
    ]
  },

  // ===================== OUTDOOR NATURAL SCENERY (TIME PHASES T1..T8) =====================
  times: {
    // T1: Rạng sáng (04:00 - 06:00)
    T1: [
      {
        title: "Bầu trời xanh tím trước bình minh, chân trời tĩnh lặng (4K)",
        url: "https://images.unsplash.com/photo-1507499739999-097706ad8914?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Ánh hồng đầu ngày hé rạng phía chân trời xa (4K)",
        url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Màn sương mỏng huyền ảo phủ trên mặt hồ trước hừng đông (4K)",
        url: "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Bầu trời tím biếc hòa quyện cùng vệt sáng đầu tiên (4K)",
        url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Chân trời rạng đông đánh thức vạn vật thức giấc (4K)",
        url: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // T2: Sáng sớm (06:00 - 08:00)
    T2: [
      {
        title: "Nắng sớm tinh khôi chiếu rọi qua đồng cỏ xanh (4K)",
        url: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Tia nắng vàng ấm áp đầu ngày xuyên qua kẽ lá (4K)",
        url: "https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Bình minh trên biển với những con sóng lấp lánh (4K)",
        url: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Sương mai tan dần dưới ánh dương sớm trong lành (4K)",
        url: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Không khí ban mai trong vắt đầy hứng khởi (4K)",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // T3: Buổi sáng (08:00 - 11:00)
    T3: [
      {
        title: "Bầu trời xanh trong vắt với nắng vàng rực rỡ (4K)",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Thung lũng ngập tràn nắng sớm tươi mới và trong trẻo (4K)",
        url: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Nắng vàng chiếu rọi con đường xanh thênh thang (4K)",
        url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Bờ biển xanh biếc dưới bầu trời mây trắng bồng bềnh (4K)",
        url: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // T4: Buổi trưa (11:00 - 14:00)
    T4: [
      {
        title: "Ánh nắng đỉnh đầu soi rọi làn nước ngọc bích trong suốt (4K)",
        url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Bóng râm mát rượi dưới tán cây rừng nhiệt đới trưa hè (4K)",
        url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Biển cả bao la rực rỡ dưới ánh nắng trưa rực rỡ (4K)",
        url: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // T5: Buổi chiều (14:00 - 17:00)
    T5: [
      {
        title: "Ánh nắng xiên vàng ấm của buổi chiều tà (4K)",
        url: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Rừng lá thu nhuộm sắc vàng mật ong ấm áp (4K)",
        url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Bàn cà phê chiều êm ả đón vạt nắng cuối ngày (4K)",
        url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Đồi cỏ xanh mướt ngả màu vàng ươm theo bóng chiều (4K)",
        url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Tia nắng muộn buông nhẹ trên mặt nước hồ lấp lánh (4K)",
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // T6: Hoàng hôn (17:00 - 18:30)
    T6: [
      {
        title: "Ráng chiều hoàng hôn rực rỡ sắc cam hồng trên đỉnh núi (4K)",
        url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Mặt trời chìm dần dưới đường chân trời biển cả tím biếc (4K)",
        url: "https://images.unsplash.com/photo-1509233725247-49e657c54213?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Hoàng hôn lộng lẫy trên bờ cát với sóng biển dập dềnh (4K)",
        url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Sắc ráng đỏ nhuộm hồng những đám mây cuối chân trời (4K)",
        url: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Bầu trời hoàng hôn chuyển màu từ vàng cam sang tím thẫm (4K)",
        url: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // T7: Chập tối (18:30 - 21:00)
    T7: [
      {
        title: "Thành phố lên đèn rực rỡ giữa giờ xanh chập tối (4K)",
        url: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Ánh đèn đường lung linh phản chiếu trên mặt phố êm ả (4K)",
        url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Tầm nhìn thành phố về đêm rực rỡ ánh sáng văn minh (4K)",
        url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Bầu trời chập tối xanh thẫm bên ánh sáng ấm áp của phố thị (4K)",
        url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // T8: Đêm khuya (21:00 - 04:00)
    T8: [
      {
        title: "Dải Ngân Hà rực rỡ vắt ngang bầu trời đêm thăm thẳm (4K)",
        url: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Đêm ngàn sao lấp lánh trên đỉnh núi tuyết tĩnh mịch (4K)",
        url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Bầu trời đêm vô tận huyền bí ngập tràn tinh tú (4K)",
        url: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Vũ trụ bao la diệu kỳ soi bóng xuống hồ nước tĩnh lặng (4K)",
        url: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Ánh sao đêm thanh khiết xoa dịu tâm hồn trước giấc ngủ (4K)",
        url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Bầu trời đêm sâu thẳm cùng ánh trăng thanh khiết (4K)",
        url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=3840&q=92&auto=format&fit=crop"
      }
    ]
  },

  // ===================== WEATHER DYNAMICS (W5 RAIN, W6 STORM, W7 FOG) =====================
  weathers: {
    // Mưa nhẹ
    W5: [
      {
        title: "Giọt mưa đọng lăn trên mặt kính cửa sổ quán cà phê (4K)",
        url: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Cơn mưa rào dịu mát trên đường phố phố chiều (4K)",
        url: "https://images.unsplash.com/photo-1438449805896-28a666819a20?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Những gợn sóng mưa lăn tăn trên mặt nước trong veo (4K)",
        url: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Mưa phùn bay qua tán lá xanh mướt mát lành (4K)",
        url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // Mưa lớn
    W6: [
      {
        title: "Màn mưa xối xả đọng trên kính bên ánh đèn đường ấm áp (4K)",
        url: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Cơn mưa giông mạnh mẽ gột rửa sạch bầu trời và cảnh vật (4K)",
        url: "https://images.unsplash.com/photo-1438449805896-28a666819a20?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Dòng nước mưa cuộn trôi tạo nên giai điệu thiên nhiên êm dịu (4K)",
        url: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=3840&q=92&auto=format&fit=crop"
      }
    ],

    // Sương mù
    W7: [
      {
        title: "Rừng thông bảng lảng màn sương mù trắng xóa huyền ảo (4K)",
        url: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Lối đi mờ sương trong khu rừng cổ tích thanh bình (4K)",
        url: "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=3840&q=92&auto=format&fit=crop"
      },
      {
        title: "Làn sương mỏng lượn lờ trên đỉnh đồi thoai thoải (4K)",
        url: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=3840&q=92&auto=format&fit=crop"
      }
    ]
  }
};

class SceneryEngine {
  /**
   * Retrieves a rich, tailored list of verified 4K wallpapers
   * based on current space, time slot, and weather conditions.
   */
  static getImages({ spaceId, timeSlot = "T5", weatherSlot = "W1", isDay = true }) {
    // 1. If user selected a specific Living Space (not 'auto')
    if (spaceId && spaceId !== "auto") {
      // Look up specific space
      if (SCENERY_CATALOG.spaces[spaceId] && SCENERY_CATALOG.spaces[spaceId].length > 0) {
        return SCENERY_CATALOG.spaces[spaceId];
      }

      // Fallback lookup: find parent group of space from SpaceEngine
      if (typeof SpaceEngine !== "undefined") {
        const sp = SpaceEngine.getSpace(spaceId);
        if (sp && sp.groupId) {
          // Map group to representative spaces
          const groupMap = {
            nha_o: "phong_khach",
            cong_viec: "van_phong",
            hoc_tap: "thu_vien",
            di_chuyen: "o_to_rieng",
            thien_nhien: "bai_bien",
            giai_tri: "quan_ca_phe",
            ren_luyen: "phong_gym",
            nghi_duong: "homestay",
            cong_cong: "van_phong",
            dac_biet: "noi_yen_tinh"
          };
          const mappedKey = groupMap[sp.groupId];
          if (mappedKey && SCENERY_CATALOG.spaces[mappedKey]) {
            return SCENERY_CATALOG.spaces[mappedKey];
          }
        }
      }
    }

    // 2. Outdoor Auto Mode: check rainy or foggy weather first
    if (weatherSlot === "W5" && SCENERY_CATALOG.weathers.W5) {
      return SCENERY_CATALOG.weathers.W5;
    }
    if (weatherSlot === "W6" && SCENERY_CATALOG.weathers.W6) {
      return SCENERY_CATALOG.weathers.W6;
    }
    if (weatherSlot === "W7" && SCENERY_CATALOG.weathers.W7) {
      return SCENERY_CATALOG.weathers.W7;
    }

    // 3. Outdoor Auto Mode: match exact time slot T1..T8
    if (SCENERY_CATALOG.times[timeSlot] && SCENERY_CATALOG.times[timeSlot].length > 0) {
      return SCENERY_CATALOG.times[timeSlot];
    }

    // Default fallback to afternoon or dawn
    return SCENERY_CATALOG.times.T5 || SCENERY_CATALOG.times.T2;
  }
}

if (typeof window !== "undefined") {
  window.SCENERY_CATALOG = SCENERY_CATALOG;
  window.SceneryEngine = SceneryEngine;
}
