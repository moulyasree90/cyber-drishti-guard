CREATE TABLE public.lesson_rewards (user_id uuid NOT NULL, lesson text NOT NULL, points integer NOT NULL DEFAULT 25, earned_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(user_id,lesson));
GRANT SELECT ON public.lesson_rewards TO authenticated;
GRANT ALL ON public.lesson_rewards TO service_role;
ALTER TABLE public.lesson_rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own rewards" ON public.lesson_rewards FOR SELECT TO authenticated USING(auth.uid()=user_id);
CREATE FUNCTION public.complete_safety_lesson(p_lesson text, p_answer integer) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$ DECLARE expected integer; BEGIN IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Sign in required'; END IF; expected := CASE p_lesson WHEN 'phishing' THEN 1 WHEN 'shopping' THEN 2 WHEN 'qr' THEN 0 WHEN 'otp' THEN 1 WHEN 'passwords' THEN 2 WHEN 'payments' THEN 0 ELSE NULL END; IF expected IS NULL OR p_answer != expected THEN RETURN false; END IF; INSERT INTO public.lesson_rewards(user_id, lesson) VALUES(auth.uid(),p_lesson) ON CONFLICT DO NOTHING; RETURN true; END; $$;
REVOKE ALL ON FUNCTION public.complete_safety_lesson(text,integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.complete_safety_lesson(text,integer) TO authenticated;