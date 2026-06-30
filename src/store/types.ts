// ─── Content State ───────────────────────────────────

export interface SurveyOption {
  id: string;
  text: string;
}

export interface ConditionalLogic {
  id: string;
  ifOption: string;       // option ID
  thenRedirectTo: string; // question ID or 'thank-you'
}

export type QuestionType = 'single_choice' | 'multiple_choice' | 'text' | 'range' | 'rating';

export interface RangeSettings {
  min: number;
  max: number;
  step: number;
  leftLabel: string;
  rightLabel: string;
}

export interface RatingSettings {
  maxStars: number;
  shape: 'star' | 'heart' | 'thumb';
}

export interface QuestionPage {
  id: string;
  type: QuestionType;
  title: string;
  subtitle: string;
  options: SurveyOption[];
  rangeSettings?: RangeSettings;
  ratingSettings?: RatingSettings;
  additionalComments: boolean;
  logic: ConditionalLogic[];
  submitButtonText: string;
}

export interface ThankYouPage {
  enabled: boolean;
  mediaUrl: string | null;  // Supabase Storage URL
  mediaType: 'image' | 'gif' | 'lottie' | null;
  title: string;
  subtitle: string;
  ctaButtonText: string;
  redirectType: 'url' | 'none';
  redirectUrl: string;
}

export interface ContentState {
  numberOfPages: number;
  questions: QuestionPage[];
  thankYouPage: ThankYouPage;
}

// ─── Styling State ───────────────────────────────────

export interface FontStyle {
  color: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  alignment: 'left' | 'center' | 'right';
  margin: { top: number; bottom: number; left: number; right: number };
}

export interface CornerRadius {
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
}

export interface AppearanceStyle {
  backgroundColor: string;
  cornerRadius: CornerRadius;
  delaySeconds: number;
  backdropColor: string;
  backdropOpacity: number;
}

export interface OptionListStyle {
  layout: 'radio' | 'checkbox' | 'filled' | 'alternative';
  optionHeight: number;
  bulletSpacing: number;
  optionSpacing: number;
  cornerRadius: CornerRadius;
}

export interface OptionItemStyle {
  borderColor: string;
  textColor: string;
  backgroundColor: string;
  borderWidth: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fontStyle: { bold: boolean; italic: boolean; underline: boolean };
  alignment: 'left' | 'center' | 'right';
}

export interface ButtonStyle {
  fullWidth: boolean;
  borderColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
  fontSize: number;
  fontStyle: { bold: boolean; italic: boolean; underline: boolean };
  height: number;
  width: number;
  borderWidth: number;
  cornerRadius: CornerRadius;
  alignment: 'left' | 'center' | 'right';
  margin: { top: number; bottom: number; left: number; right: number };
}

export interface CrossButtonStyle {
  enabled: boolean;
  style: 'default' | 'circle' | 'square' | 'minimal';
  customIcon: string | null;
  crossColor: string;
  fillColor: string;
  strokeColor: string;
  size: number;
  margin: { top: number; bottom: number; left: number; right: number };
}

export interface ImageStyle {
  width: number;
  height: number;
  margin: { top: number; bottom: number; left: number; right: number };
}

export interface StylingState {
  appearance: AppearanceStyle;
  questionTitle: FontStyle;
  subtitle: FontStyle;
  optionList: OptionListStyle;
  selectedOption: OptionItemStyle;
  unselectedOption: OptionItemStyle;
  additionalComment: OptionItemStyle;
  ctaButton: ButtonStyle;
  crossButton: CrossButtonStyle;
  thankYouTitle: FontStyle;
  thankYouSubtitle: FontStyle;
  thankYouImage: ImageStyle;
  thankYouButton: ButtonStyle;
}
