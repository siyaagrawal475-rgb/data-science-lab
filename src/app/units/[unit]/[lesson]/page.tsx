import React from 'react';
import { notFound } from 'next/navigation';
import { UNIT_1_LESSONS } from '@/data/unit1/lessons';
import { UNIT_2_LESSONS } from '@/data/unit2/lessons';
import { UNIT_3_LESSONS } from '@/data/unit3/lessons';
import { UNIT_4_LESSONS } from '@/data/unit4/lessons';
import { UNIT_5_LESSONS } from '@/data/unit5/lessons';
import { UNIT_6_LESSONS } from '@/data/unit6/lessons';
import { LessonLayout } from '@/components/lessons/LessonLayout';

interface LessonPageProps {
  params: Promise<{
    unit: string;
    lesson: string;
  }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const resolvedParams = await params;
  const unitParam = resolvedParams.unit.toLowerCase();
  const lessonSlug = resolvedParams.lesson.toLowerCase();

  const isUnit1 = unitParam === '1' || unitParam === 'unit-1';
  const isUnit2 = unitParam === '2' || unitParam === 'unit-2';
  const isUnit3 = unitParam === '3' || unitParam === 'unit-3';
  const isUnit4 = unitParam === '4' || unitParam === 'unit-4';
  const isUnit5 = unitParam === '5' || unitParam === 'unit-5';
  const isUnit6 = unitParam === '6' || unitParam === 'unit-6';

  if (!isUnit1 && !isUnit2 && !isUnit3 && !isUnit4 && !isUnit5 && !isUnit6) {
    notFound();
  }

  const lessonList = isUnit1
    ? UNIT_1_LESSONS
    : isUnit2
    ? UNIT_2_LESSONS
    : isUnit3
    ? UNIT_3_LESSONS
    : isUnit4
    ? UNIT_4_LESSONS
    : isUnit5
    ? UNIT_5_LESSONS
    : UNIT_6_LESSONS;

  // Find lesson by slug or order
  const lessonIndex = lessonList.findIndex(
    (l) => l.slug === lessonSlug || l.id === lessonSlug || String(l.order) === lessonSlug
  );

  if (lessonIndex === -1) {
    notFound();
  }

  const lesson = lessonList[lessonIndex];
  const prevLesson =
    lessonIndex > 0
      ? {
          slug: lessonList[lessonIndex - 1].slug,
          title: lessonList[lessonIndex - 1].title,
          lessonNumber: lessonList[lessonIndex - 1].order,
        }
      : null;

  const nextLesson =
    lessonIndex < lessonList.length - 1
      ? {
          slug: lessonList[lessonIndex + 1].slug,
          title: lessonList[lessonIndex + 1].title,
          lessonNumber: lessonList[lessonIndex + 1].order,
        }
      : null;

  return (
    <LessonLayout
      lesson={lesson}
      prevLesson={prevLesson}
      nextLesson={nextLesson}
    />
  );
}
