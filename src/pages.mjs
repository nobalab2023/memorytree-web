const email = 'memorytree.support@gmail.com';
const contact = `<a href="mailto:${email}">${email}</a>`;
const p = text => `<p>${text}</p>`;
const list = items => `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
const steps = items => `<ol>${items.map(item => `<li>${item}</li>`).join('')}</ol>`;
const emailBox = (label, button, subject, body) => `<aside class="callout"><p>${label}</p><p class="contact-email">${contact}</p><a class="button" href="mailto:${email}?subject=${encodeURIComponent(subject)}&amp;body=${encodeURIComponent(body)}">${button}<span aria-hidden="true">↗</span></a></aside>`;
const providers = (firebase, google) => `<p><a href="https://firebase.google.com/support/privacy">${firebase}</a> · <a href="https://policies.google.com/privacy">${google}</a></p>`;

export const pages = {
  ko: {
    privacy: {
      title: '개인정보처리방침',
      description: 'NOVA LAB의 Memory Tree 개인정보처리방침. 계정, 사진, 추억, 설정 정보의 처리와 보관, 삭제 및 권리 행사 방법을 안내합니다.',
      intro: 'Memory Tree는 소중한 추억을 기록하는 공간입니다. NOVA LAB이 어떤 정보를 처리하고, 왜 필요하며, 어떻게 삭제를 요청할 수 있는지 안내합니다.',
      sections: [
        ['1. 운영자와 적용 범위', p(`앱명은 Memory Tree이며 운영·개발자는 NOVA LAB입니다. 이 방침은 Memory Tree 앱과 공식 홈페이지에 적용됩니다. 개인정보 문의는 ${contact}로 보내주세요.`)],
        ['2. 처리하는 정보와 목적', list([
          '<strong>계정·프로필:</strong> Google Sign-In 등 로그인 제공자와 Firebase Authentication을 통해 사용자 ID, 이메일, 프로필 이름, 로그인 제공자 정보 및 제공자가 전달하는 프로필 사진 URL을 처리합니다. 로그인, 계정 식별, 접근 권한 관리, 프로필 표시를 위해 사용합니다. 직접 선택한 프로필 사진은 현재 기기에 저장되며, 수정한 이름은 계정 정보에 반영될 수 있습니다.',
          '<strong>사진·추억:</strong> 직접 등록한 사진, 캡션, 메모, 날짜, 입력한 장소, 추억의 날씨 정보, 나무·정원·연도, 사진 크롭 및 3D 배치 정보를 처리합니다. 추억의 저장·표시·편집과 활성화된 백업·복원 기능을 위해 사용합니다.',
          '<strong>설정·서비스 정보:</strong> 언어, 환경음, 화면 효과, 날씨 표시 등 설정과 동기화 상태, 계정별 이용 제한 및 보안에 필요한 정보를 처리합니다. 일부 계정 설정은 서버와 동기화되며 그래픽 품질은 기기 설정으로 저장합니다.',
          '<strong>문의 정보:</strong> 이메일 문의 시 발신 주소와 사용자가 보낸 내용을 문의 응대, 본인 확인, 개인정보 권리 요청 처리에 사용합니다.',
          '<strong>보안·선택 진단:</strong> Firebase 및 Google 서비스는 인증과 부정 이용 방지를 위해 IP 주소, 앱·기기 확인 정보 등을 처리할 수 있습니다. Crashlytics 오류 보고는 기본적으로 꺼져 있으며 사용자가 허용한 경우 오류, 기기·OS·앱 버전, 진단 식별자 등 오류 분석 정보를 처리할 수 있습니다.'
        ])],
        ['3. 사진 접근, 위치와 로컬 저장', p('사진 선택·카메라는 사용자가 해당 기능을 실행할 때 이용합니다. 모든 사진 보관함을 자동 업로드하지 않습니다. 현재 출시용 앱은 실시간 GPS를 수집하지 않으며, 기기의 정확한 GPS 위치를 다른 사용자에게 공유하는 기능을 제공하지 않습니다. 사용자가 입력한 장소나 선택한 지역 정보가 추억·환경 설정에 포함될 수 있습니다. 공유가 허용된 추억에서는 사용자가 직접 입력한 장소나 사진에 표시된 위치도 해당 추억을 볼 수 있는 사람에게 보일 수 있습니다.') + p('원본 사진에 촬영 시각·기기·위치 등 EXIF 메타데이터가 포함되어 있다면 원본 보관·백업 시 함께 저장될 수 있습니다. 표시용 이미지와 썸네일은 불필요한 EXIF를 제거해 생성합니다. 위치가 포함된 원본을 보관하고 싶지 않다면 사진을 등록하기 전에 해당 메타데이터를 제거해 주세요.') + p('추억은 기기에 먼저 저장되며 계정 또는 게스트 저장 영역을 구분합니다. 클라우드 연결·동기화를 사용하는 경우 계정에 연결된 메타데이터와 사진이 서버에 저장될 수 있습니다. 기존 로컬 사진 업로드는 별도 동의 흐름을 따르며, 로그인만으로 게스트 데이터를 다른 계정에 자동 이전하지 않습니다.')],
        ['4. 제3자 서비스와 전송', p('Firebase Authentication 및 Google Sign-In은 인증을, Cloud Firestore는 계정·추억·설정 데이터 저장을, Cloud Storage for Firebase는 활성화된 사진 백업을, Cloud Functions는 서버 처리를 지원합니다. Firebase App Check는 앱·기기 검증에 사용하며 Crashlytics는 선택적 오류 분석에 사용합니다. 서비스 제공자는 각 서비스의 기능 수행을 위해 필요한 정보를 처리합니다.') + p('데이터 전송에는 HTTPS/TLS를 사용합니다. 이는 전송 구간 보호이며 종단간 암호화를 의미하지 않습니다. Google/Firebase의 처리 환경에 따라 사용자의 거주 국가 밖에서 데이터가 처리될 수 있습니다. 모든 인증·진단 정보가 특정 한 국가에만 저장된다고 보장하지 않습니다.') + providers('Firebase 개인정보·보안 안내', 'Google 개인정보처리방침')],
        ['5. 광고, 구매 및 홈페이지', p('현재 Memory Tree는 광고와 디지털 상품 구매를 제공하지 않습니다. 이 홈페이지에는 로그인, 결제, 분석 SDK 또는 추적 쿠키를 넣지 않습니다. 웹 호스팅 제공자는 페이지 제공과 보안을 위해 IP 주소 및 요청 관련 로그를 처리할 수 있습니다. 이메일 링크는 사용자의 이메일 앱을 열며, 실제로 메일을 보내야 요청이 접수됩니다.')],
        ['6. 보관 및 삭제', p('계정 정보와 서버에 저장된 추억·사진은 서비스를 제공하는 동안 보관하며, 목적이 종료되거나 계정 삭제 요청이 처리되면 삭제 대상에 포함합니다. 이메일로 접수된 계정 삭제 요청은 본인 확인 후 30일 이내 처리를 목표로 합니다. 본인 확인, 기술적 정리 또는 법적 사유로 더 필요한 경우 이유와 예상 일정을 이메일로 안내합니다.') + p('기기에만 저장된 데이터와 사용자가 별도로 보관한 사진·내보내기 파일은 서버 삭제만으로 자동 삭제되지 않습니다. 필요한 자료는 삭제 요청 전에 별도로 보관하고, 기기 사본은 직접 삭제해 주세요. 앱을 삭제하는 것만으로 서버 계정과 데이터가 삭제되지는 않습니다.') + p('법적 보관 의무가 있는 경우에는 필요한 정보만 해당 법령이 요구하는 기간 동안 제한적으로 보관한 뒤 삭제합니다. 해당되는 보관 사유·항목·기간은 요청 처리 시 안내합니다. 서비스 제공자의 백업·보안 로그는 자체 정책과 기술적 삭제 주기에 따라 제거되므로 즉시 모든 사본이 지워지는 것은 아닙니다.')],
        ['7. 사용자 권리와 계정 삭제 요청', p(`개인정보 열람, 정정, 삭제 및 처리 제한에 관한 요청은 ${contact}로 접수할 수 있습니다. 계정 삭제 방법과 삭제 범위는 <a href="/delete-account">계정 삭제 안내</a>를 확인해 주세요. 계정 보호를 위해 필요한 최소한의 본인 확인을 요청할 수 있으며, 비밀번호나 인증 코드를 요구하지 않습니다.`) + p('선택적 오류 보고는 앱 설정에서 끌 수 있으며 사진·카메라 권한은 기기 설정에서 관리할 수 있습니다. 권한을 허용하지 않으면 해당 기능이 제한될 수 있습니다. 적용 법률에 따라 개인정보 감독기관에 문의하거나 권리를 행사할 수 있습니다.')],
        ['8. 변경 안내와 연락처', p(`기능이나 개인정보 처리 방식이 달라지면 이 페이지와 업데이트 날짜를 갱신하고, 중요한 변경은 필요한 방식으로 안내합니다. 한국어·영어·일본어 안내는 동일한 정책을 전달하며 번역에 차이가 있으면 ${contact}로 문의해 주세요.`)]
      ]
    },
    'delete-account': {
      title: '계정 및 데이터 삭제',
      description: 'Memory Tree 계정과 프로필, 서버에 저장된 추억 및 사진 데이터 삭제를 이메일로 요청하는 방법입니다.',
      intro: '앱에 로그인할 수 없어도 이메일로 Memory Tree 계정과 관련 데이터의 삭제를 요청할 수 있습니다. NOVA LAB이 요청을 확인하고 안내해 드립니다.',
      callout: emailBox('Memory Tree 계정 삭제 요청', '삭제 요청 이메일 작성', 'Memory Tree 계정 삭제 요청', '가입에 사용한 이메일 주소: \n\nMemory Tree 계정과 관련 서버 데이터의 삭제를 요청합니다.\n'),
      sections: [
        ['요청 방법', steps([`가입에 사용한 이메일 주소를 포함해 ${contact}로 메일을 보내주세요. 가능하면 가입한 이메일 계정에서 직접 보내주세요.`, '제목에 “Memory Tree 계정 삭제 요청”을 적고, 계정과 관련 데이터 삭제를 원한다고 알려주세요.', '계정 소유자 확인이 필요한 경우 최소한의 추가 확인을 안내합니다. 비밀번호, 일회용 인증 코드, 신분증 사본이나 사진 원본을 먼저 보내지 마세요.', '이메일 작성 버튼을 누르는 것만으로 접수되지 않습니다. 이메일 앱에서 메일을 전송해 주세요. 이메일 앱이 없다면 위 주소를 복사해 사용하는 메일 서비스에서 보내주세요.'])],
        ['삭제 대상', list(['Memory Tree 계정 정보 및 인증 계정', '계정에 연결된 프로필 데이터와 서버 설정', '서버에 저장된 정원·추억 기록, 메모·캡션 및 사진 배치 정보', '서버에 저장된 원본 사진, 표시용 사진 및 썸네일']) + p('Memory Tree 계정의 삭제이며, 사용자의 Google 계정 자체를 삭제하는 것은 아닙니다.')],
        ['처리 기간', p('본인 확인 후 30일 이내 처리를 목표로 합니다. 추가 확인, 기술적 정리 또는 법적 의무 때문에 지연되는 경우 이유와 예상 처리 일정을 이메일로 알려드립니다. 처리가 완료되면 결과를 안내합니다.')],
        ['남을 수 있는 정보', p('법적 보관 의무가 있는 경우 필요한 일부 정보는 법령이 요구하는 기간에 한해 제한적으로 보관할 수 있습니다. 적용되는 항목·사유·기간을 안내하고, 보관 목적이 끝나면 삭제합니다. 서비스 제공자의 백업·보안 로그 정리는 해당 제공자의 정책 및 삭제 주기에 따릅니다.') + p('기기 안에만 있는 데이터, 휴대폰 사진 보관함 및 별도로 내보낸 파일은 서버 계정 삭제로 자동 제거되지 않습니다. 기기 사본은 직접 삭제해 주세요. 앱 제거만으로 서버 데이터가 삭제되지 않습니다.')],
        ['삭제 전에 확인해 주세요', p('삭제가 완료된 계정과 추억은 복구할 수 없습니다. 보관할 사진이나 메모가 있다면 먼저 사본을 확보해 주세요. 요청 범위나 진행 상태는 같은 지원 이메일로 문의할 수 있습니다.') + p('<a href="/privacy">개인정보처리방침</a>에서 데이터 처리 방식을 확인할 수 있습니다.')]
      ]
    },
    support: {
      title: '무엇을 도와드릴까요?',
      description: 'Memory Tree 공식 고객 지원. 버그, 개인정보, 계정 삭제 및 일반 문의를 NOVA LAB에 이메일로 보내주세요.',
      intro: 'Memory Tree를 사용하며 궁금하거나 불편한 점이 있나요? 한국어, 영어, 일본어로 문의하실 수 있습니다.',
      callout: emailBox('NOVA LAB · 공식 지원 이메일', '이메일로 문의하기', 'Memory Tree 문의', '문의 유형: \n\n문의 내용: \n'),
      sections: [
        ['문의할 수 있는 내용', '<ul class="support-topics"><li><strong>버그 문의</strong>오류, 화면 문제, 사진 선택 또는 저장 문제</li><li><strong>개인정보 문의</strong>데이터 처리, 열람, 정정 또는 삭제 요청</li><li><strong>계정 삭제 문의</strong>삭제 방법, 진행 상태 및 삭제 범위</li><li><strong>일반 문의</strong>앱 이용 방법, 출시 소식 및 의견</li></ul>'],
        ['버그를 알려주실 때', p('가능하면 휴대폰 모델, Android 버전, 앱 버전, 문제가 발생한 순서와 발생 시각을 함께 알려주세요. 스크린샷을 보내는 경우 이메일 주소, 개인 사진 등 민감한 정보는 먼저 가려주세요. 비밀번호나 인증 코드는 보내지 마세요.')],
        ['계정과 개인정보 관련 안내', p('<a href="/delete-account">계정 삭제 안내</a> · <a href="/privacy">개인정보처리방침</a>') + p('메일을 전송한 뒤 요청이 접수됩니다. 문의 내용을 확인한 후 이메일로 답변드리며, 추가 확인이 필요한 경우 따로 안내합니다.')]
      ]
    }
  },
  en: {
    privacy: {
      title: 'Privacy Policy',
      description: 'Memory Tree privacy policy by NOVA LAB: how account, photo, memory, and settings data is used, retained, and deleted, and how to exercise your rights.',
      intro: 'Memory Tree is a place for the moments that matter. Here is what NOVA LAB processes, why it is needed, and how you can request deletion.',
      sections: [
        ['1. Operator and scope', p(`Memory Tree is operated and developed by NOVA LAB. This policy covers the Memory Tree app and its official website. For privacy questions, contact ${contact}.`)],
        ['2. Information we process and why', list([
          '<strong>Account and profile:</strong> Through sign-in providers such as Google Sign-In and Firebase Authentication, we process your user ID, email, profile name, sign-in provider information, and any profile photo URL supplied by the provider. This supports sign-in, account identification, access control, and profile display. A custom profile photo you choose is currently stored on your device; an edited name may be reflected in your account.',
          '<strong>Photos and memories:</strong> We process photos you add, captions, notes, dates, places you enter, weather attached to a memory, tree/garden/year information, crops, and 3D placements. This supports saving, displaying, editing, and enabled backup and restore features.',
          '<strong>Preferences and service data:</strong> We process language, ambient sound, visual effects, weather display preferences, sync status, and information needed for account usage limits and security. Some account preferences sync with the server; graphics quality is stored as a device preference.',
          '<strong>Support messages:</strong> When you email us, we use your sender address and the information you send to respond, verify account ownership, and handle privacy requests.',
          '<strong>Security and optional diagnostics:</strong> Firebase and Google services may process IP addresses and app/device verification information for authentication and abuse prevention. Crashlytics reporting is off by default. If you allow it, error details, device/OS/app versions, diagnostic identifiers, and related troubleshooting information may be processed.'
        ])],
        ['3. Photo access, location, and local storage', p('Photo selection and the camera are used when you choose those features. We do not automatically upload your entire photo library. The current release app does not collect live GPS location or offer a feature that shares your device’s precise GPS location with other users. Places you enter or regions you select may be part of memories or environment preferences. If access to a memory is shared, people allowed to view it may also see places you entered or locations visible in the photo.') + p('Original photos may contain EXIF metadata such as capture time, device details, or location. This metadata may remain when originals are stored or backed up. Display images and thumbnails are generated without unnecessary EXIF. If you do not want location metadata retained in an original, remove it before adding the photo.') + p('Memories are saved locally first, with separate account and guest storage. When cloud connection and sync are used, account-linked metadata and photos may be stored on servers. Uploading existing local photos follows a separate consent flow; sign-in alone does not automatically transfer guest data to another account.')],
        ['4. Third-party services and transfers', p('Firebase Authentication and Google Sign-In support authentication; Cloud Firestore stores account, memory, and preference data; Cloud Storage for Firebase supports enabled photo backups; and Cloud Functions handles server processing. Firebase App Check verifies apps/devices, and Crashlytics supports optional error analysis. Providers process information needed to perform these services.') + p('Data is transmitted using HTTPS/TLS. This protects data in transit; it does not mean end-to-end encryption. Google/Firebase may process information outside your country of residence. We do not guarantee that all authentication and diagnostic data stays in a single country.') + providers('Firebase privacy and security', 'Google Privacy Policy')],
        ['5. Ads, purchases, and this website', p('Memory Tree currently offers no ads or digital purchases. This website has no sign-in, payment, analytics SDK, or tracking cookies. The hosting provider may process IP addresses and request logs to deliver and protect the website. Email links open your email app; a request is received only when you send the message.')],
        ['6. Retention and deletion', p('Account information and server-stored memories and photos are retained while needed to provide the service. They are included in deletion when their purpose ends or an account deletion request is processed. For requests submitted by email, we aim to process deletion within 30 days after verifying ownership. If verification, technical cleanup, or legal requirements take longer, we will explain the reason and estimated timing by email.') + p('Data stored only on your device, separately saved photos, and exported files are not automatically removed by server deletion. Keep copies of anything you need before requesting deletion, and remove device copies yourself. Uninstalling the app does not delete your server account or data.') + p('Where retention is legally required, only the necessary information is kept with restricted use for the period required by law, then deleted. We explain any applicable reason, data categories, and period when handling the request. Provider backups and security logs are removed under the provider’s policies and technical deletion cycles, so not every copy disappears immediately.')],
        ['7. Your choices and deletion requests', p(`You may request access, correction, deletion, or restrictions on processing by contacting ${contact}. See <a href="/en/delete-account">account deletion</a> for instructions and scope. We may ask for the minimum information needed to confirm account ownership, but will not ask for passwords or verification codes.`) + p('You can turn off optional error reporting in the app and manage photo/camera permissions in device settings. Denying a permission may limit that feature. You may also contact your privacy regulator or exercise rights available under applicable law.')],
        ['8. Updates and contact', p(`When features or data practices change, we update this page and its date, and provide notice of important changes as required. Korean, English, and Japanese versions describe the same policy. If a translation appears inconsistent, please contact ${contact}.`)]
      ]
    },
    'delete-account': {
      title: 'Delete your account and data',
      description: 'Request deletion of your Memory Tree account, profile, server-stored memories, and photos by email to NOVA LAB.',
      intro: 'You can request deletion of your Memory Tree account and related data by email, even if you cannot sign in to the app. NOVA LAB will review your request and guide you through the process.',
      callout: emailBox('Memory Tree account deletion request', 'Write a deletion request', 'Memory Tree account deletion request', 'Email address used to sign up: \n\nPlease delete my Memory Tree account and its related server data.\n'),
      sections: [
        ['How to request deletion', steps([`Email ${contact} and include the email address you used to sign up. If possible, send the request from that address.`, 'Use “Memory Tree account deletion request” as the subject and state that you want your account and related data deleted.', 'If needed, we will explain the minimum additional checks to verify ownership. Do not send passwords, one-time codes, ID document copies, or original photos upfront.', 'The button opens a draft; clicking it does not submit a request. Send the email from your email app. If you have no email app, copy the address and use your preferred email service.'])],
        ['What will be deleted', list(['Your Memory Tree account information and authentication account', 'Linked profile data and server-stored preferences', 'Server-stored garden and memory records, notes, captions, and photo placements', 'Server-stored original photos, display images, and thumbnails']) + p('This deletes your Memory Tree account, not your Google account.')],
        ['Processing time', p('We aim to process requests within 30 days after verifying ownership. If additional checks, technical cleanup, or legal obligations cause a delay, we will email you the reason and estimated timeline. We will confirm the result when processing is complete.')],
        ['Information that may remain', p('Where required by law, limited information may be retained only for the legally required period. We explain the applicable data, reason, and duration, and delete it when that purpose ends. Provider backups and security logs follow the provider’s retention and deletion cycles.') + p('Device-only data, your phone’s photo library, and separately exported files are not automatically erased when the server account is deleted. Remove device copies yourself. Uninstalling the app alone does not delete server data.')],
        ['Before you request deletion', p('A deleted account and its memories cannot be recovered. Save copies of photos or notes you want to keep first. You can ask about the scope or status of a request using the same support address.') + p('See our <a href="/en/privacy">Privacy Policy</a> for more about data processing.')]
      ]
    },
    support: {
      title: 'How can we help?',
      description: 'Official Memory Tree support by NOVA LAB. Email us about bugs, privacy, account deletion, or general questions.',
      intro: 'Have a question or a problem with Memory Tree? You can contact us in Korean, English, or Japanese.',
      callout: emailBox('NOVA LAB · Official support email', 'Email support', 'Memory Tree support request', 'Topic: \n\nMessage: \n'),
      sections: [
        ['What we can help with', '<ul class="support-topics"><li><strong>Bug reports</strong>Errors, display issues, photo selection, or saving problems</li><li><strong>Privacy</strong>Data processing, access, correction, or deletion requests</li><li><strong>Account deletion</strong>How to request it, what is deleted, and request status</li><li><strong>General questions</strong>Using the app, launch information, and feedback</li></ul>'],
        ['When reporting a bug', p('If possible, include your phone model, Android version, app version, steps to reproduce, and when the issue occurred. Hide personal photos, email addresses, and other sensitive information in screenshots. Never send passwords or verification codes.')],
        ['Account and privacy help', p('<a href="/en/delete-account">Account deletion</a> · <a href="/en/privacy">Privacy Policy</a>') + p('Your request is received after you send the email. We will reply by email after reviewing it and let you know if further information is needed.')]
      ]
    }
  },
  ja: {
    privacy: {
      title: 'プライバシーポリシー',
      description: 'NOVA LABが運営するMemory Treeのプライバシーポリシー。アカウント、写真、思い出、設定情報の利用・保存・削除と権利の行使について。',
      intro: 'Memory Treeは、大切な思い出を残す場所です。NOVA LABが取り扱う情報、その目的、削除の依頼方法についてご案内します。',
      sections: [
        ['1. 運営者と適用範囲', p(`アプリ名はMemory Tree、運営・開発者はNOVA LABです。本ポリシーはMemory Treeアプリおよび公式サイトに適用されます。個人情報についてのお問い合わせは${contact}までお送りください。`)],
        ['2. 取り扱う情報と利用目的', list([
          '<strong>アカウント・プロフィール：</strong>Google Sign-Inなどのログイン提供元とFirebase Authenticationを通じて、ユーザーID、メールアドレス、プロフィール名、ログイン提供元の情報、提供元から受け取るプロフィール写真URLを取り扱います。ログイン、本人の識別、アクセス権管理、プロフィール表示に利用します。自分で選んだプロフィール写真は現在端末に保存され、編集した名前はアカウント情報に反映される場合があります。',
          '<strong>写真・思い出：</strong>登録した写真、キャプション、メモ、日付、入力した場所、思い出の天気、木・庭・年の情報、写真の切り抜きと3D配置情報を取り扱います。記録の保存・表示・編集と、有効なバックアップ・復元機能に利用します。',
          '<strong>設定・サービス情報：</strong>言語、環境音、画面効果、天気表示などの設定、同期状態、アカウントの利用制限やセキュリティに必要な情報を取り扱います。一部のアカウント設定はサーバーと同期され、グラフィック品質は端末設定として保存されます。',
          '<strong>お問い合わせ：</strong>メールの送信元アドレスと内容を、回答、本人確認、個人情報に関するご依頼への対応に利用します。',
          '<strong>セキュリティ・任意の診断：</strong>FirebaseやGoogleのサービスは、認証や不正利用防止のためIPアドレス、アプリ・端末の検証情報などを処理する場合があります。Crashlyticsのエラー報告は初期状態ではオフです。許可した場合、エラー、端末・OS・アプリのバージョン、診断識別子などの解析情報が処理されることがあります。'
        ])],
        ['3. 写真へのアクセス、位置情報、端末内保存', p('写真選択やカメラは、ユーザーがその機能を利用するときに使用します。写真ライブラリ全体を自動アップロードしません。現在のリリース用アプリはリアルタイムのGPS位置を収集せず、端末の正確なGPS位置を他のユーザーに共有する機能を提供していません。入力した場所や選択した地域は、思い出や環境設定に含まれる場合があります。閲覧を許可された思い出では、入力した場所や写真に写った位置も、その思い出を見られる人に表示される場合があります。') + p('元の写真に撮影日時・端末・位置などのEXIF情報が含まれている場合、元画像の保存・バックアップ時にその情報が残ることがあります。表示用画像とサムネイルは不要なEXIFを除いて生成します。元画像に位置情報を残したくない場合は、写真を追加する前に削除してください。') + p('思い出はまず端末に保存し、アカウントとゲストの保存領域を分けています。クラウド接続・同期を利用する場合、アカウントに紐づく記録や写真がサーバーに保存されることがあります。既存の端末内写真のアップロードは別途同意の手順を経ます。ログインだけでゲストのデータを別アカウントに自動移行することはありません。')],
        ['4. 外部サービスとデータ転送', p('Firebase AuthenticationおよびGoogle Sign-Inを認証に、Cloud Firestoreをアカウント・思い出・設定情報の保存に、Cloud Storage for Firebaseを有効な写真バックアップに、Cloud Functionsをサーバー処理に利用します。Firebase App Checkはアプリ・端末の検証、Crashlyticsは任意のエラー解析に利用します。各提供者はサービスの提供に必要な情報を処理します。') + p('通信にはHTTPS/TLSを使用します。これは通信経路の保護であり、エンドツーエンド暗号化を意味しません。Google/Firebaseの処理環境により、居住国以外で情報が処理される場合があります。すべての認証・診断情報が一つの国だけに保存されることを保証するものではありません。') + providers('Firebaseのプライバシーとセキュリティ', 'Googleプライバシーポリシー')],
        ['5. 広告・購入・公式サイト', p('現在Memory Treeは広告やデジタル商品の購入を提供していません。このサイトにはログイン、決済、解析SDK、追跡Cookieを設置していません。ホスティング提供者はページの配信と保護のため、IPアドレスやリクエストログを処理する場合があります。メールリンクはメールアプリを開くもので、実際に送信して初めて依頼が届きます。')],
        ['6. 保存期間と削除', p('アカウント情報、サーバー上の思い出・写真はサービス提供に必要な間保存し、目的が終了した場合やアカウント削除依頼の処理時に削除対象とします。メールでの削除依頼は本人確認後30日以内の対応を目標とします。本人確認、技術的な整理、法的な理由で追加の時間が必要な場合は、理由と見込みをメールでご案内します。') + p('端末内だけのデータ、別途保存した写真、書き出したファイルは、サーバー側の削除だけでは自動的に消えません。必要なデータは依頼前に保存し、端末内のコピーはご自身で削除してください。アプリをアンインストールするだけではサーバーのアカウントやデータは削除されません。') + p('法令上の保存義務がある場合、必要な情報に限り、法令が定める期間中は利用を制限して保存し、その後削除します。該当する理由・項目・期間は依頼への対応時にご案内します。提供者のバックアップやセキュリティログは各社の方針と技術的な削除周期に従うため、すべてのコピーが即時に消えるわけではありません。')],
        ['7. 権利と削除の依頼', p(`情報の開示、訂正、削除、取り扱いの制限に関するご依頼は${contact}で受け付けます。手順と対象は<a href="/ja/delete-account">アカウント削除のご案内</a>をご確認ください。アカウント保護のため必要最小限の本人確認をお願いする場合がありますが、パスワードや認証コードは求めません。`) + p('任意のエラー報告はアプリの設定からオフにでき、写真・カメラの権限は端末の設定で管理できます。許可しない場合、該当機能が制限されることがあります。適用法令に基づき個人情報の監督機関への相談や権利行使を行えます。')],
        ['8. 変更と連絡先', p(`機能や情報の取り扱いが変わった場合は本ページと更新日を改定し、重要な変更は必要な方法でお知らせします。韓国語・英語・日本語の案内は同一の方針を伝えるものです。翻訳に相違がある場合は${contact}までお問い合わせください。`)]
      ]
    },
    'delete-account': {
      title: 'アカウントとデータの削除',
      description: 'Memory Treeのアカウント、プロフィール、サーバー上の思い出と写真の削除を、NOVA LABへメールで依頼する方法です。',
      intro: 'アプリにログインできない場合でも、Memory Treeのアカウントと関連データの削除をメールで依頼できます。NOVA LABが内容を確認し、ご案内します。',
      callout: emailBox('Memory Tree アカウント削除依頼', '削除依頼メールを作成', 'Memory Tree アカウント削除依頼', '登録に使用したメールアドレス：\n\nMemory Treeのアカウントと関連するサーバーデータの削除を希望します。\n'),
      sections: [
        ['依頼の手順', steps([`登録に使用したメールアドレスを記載し、${contact}へ送信してください。可能であれば、登録したメールアドレスからお送りください。`, '件名を「Memory Tree アカウント削除依頼」とし、アカウントと関連データの削除を希望することをお知らせください。', '必要な場合は、所有者確認のための最小限の追加確認をご案内します。パスワード、ワンタイムコード、身分証明書の写し、写真の原本を最初から送らないでください。', 'ボタンを押すだけでは依頼は送信されません。メールアプリで送信してください。メールアプリがない場合は、上記のアドレスをコピーし、お使いのメールサービスから送れます。'])],
        ['削除されるもの', list(['Memory Treeのアカウント情報および認証アカウント', 'アカウントに紐づくプロフィール情報とサーバー上の設定', 'サーバー上の庭・思い出の記録、メモ・キャプション、写真配置情報', 'サーバー上の元写真、表示用画像、サムネイル']) + p('削除するのはMemory Treeのアカウントであり、Googleアカウント自体ではありません。')],
        ['対応期間', p('本人確認後30日以内の対応を目標とします。追加確認、技術的な整理、法的義務により遅れる場合は、理由と対応予定をメールでご案内します。完了後は結果をお知らせします。')],
        ['保存される場合がある情報', p('法令上必要な場合、一部の情報は法令が定める期間に限って保存することがあります。対象・理由・期間をお知らせし、目的が終了した後に削除します。提供者のバックアップやセキュリティログは、各社の保存方針と削除周期に従います。') + p('端末内だけのデータ、スマートフォンの写真ライブラリ、別途書き出したファイルは、サーバー上のアカウントを削除しても自動的には消えません。端末内のコピーはご自身で削除してください。アンインストールだけではサーバーのデータは削除されません。')],
        ['依頼の前に', p('削除済みのアカウントと思い出は復元できません。残したい写真やメモは先にコピーを保存してください。依頼の対象や進捗は同じサポート窓口で確認できます。') + p('情報の取り扱いについては<a href="/ja/privacy">プライバシーポリシー</a>をご覧ください。')]
      ]
    },
    support: {
      title: 'お手伝いできることはありますか？',
      description: 'NOVA LABによるMemory Tree公式サポート。不具合、個人情報、アカウント削除、一般のお問い合わせをメールで受け付けます。',
      intro: 'Memory Treeについてのご質問やお困りごとをお聞かせください。韓国語・英語・日本語でお問い合わせいただけます。',
      callout: emailBox('NOVA LAB · 公式サポートメール', 'メールで問い合わせる', 'Memory Tree お問い合わせ', 'お問い合わせの種類：\n\n内容：\n'),
      sections: [
        ['お問い合わせの内容', '<ul class="support-topics"><li><strong>不具合の報告</strong>エラー、表示、写真の選択や保存の問題</li><li><strong>個人情報</strong>情報の取り扱い、開示、訂正、削除のご依頼</li><li><strong>アカウント削除</strong>依頼方法、進捗、削除の対象</li><li><strong>一般のお問い合わせ</strong>使い方、リリース情報、ご意見</li></ul>'],
        ['不具合を報告するとき', p('可能であれば端末の機種、Androidとアプリのバージョン、再現手順、発生時刻をお知らせください。スクリーンショットを送る際は、メールアドレスや個人の写真などの情報を隠してください。パスワードや認証コードは送らないでください。')],
        ['アカウント・個人情報のご案内', p('<a href="/ja/delete-account">アカウント削除</a> · <a href="/ja/privacy">プライバシーポリシー</a>') + p('メールを送信するとお問い合わせが届きます。内容を確認後、メールで返信します。追加の確認が必要な場合は別途ご案内します。')]
      ]
    }
  }
};
